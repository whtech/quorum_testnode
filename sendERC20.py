#!/usr/bin/env python3
"""
@summary: submit many contract.set(arg) transactions to the example contract

@version: v06 (24/April/2018)
@since:   17/April/2018
@author:  https://github.com/drandreaskrueger
"""


from config20 import RPCaddress, ROUTE, PRIVATE_FOR, ABI

################
## Dependencies:

from web3 import Web3, HTTPProvider # pip3 install web3
from web3.utils.abi import filter_by_name, abi_to_signature
from web3.utils.encoding import pad_hex

import sys, time, random
from threading import Thread
from queue import Queue
from pprint import pprint

import requests # pip3 install requests


################
## basic tasks:


def unlockAccount(address=None, password="", duration=3600):
    """
    unlock once, then leave open, to not loose time for unlocking
    """
    if not address:
        address = w3.eth.coinbase
    return w3.personal.unlockAccount(address, password, duration)


def initialize(contractTx_blockNumber=1, contractTx_transactionIndex=0, contractAddress=None):
    """
    use example contract from 7 nodes example
    if called without arguments, it assumes that the very first transaction was done by
    ./runscript.sh script1.js
    """
    abi = ABI
    #print ("Getting the address of the example contract that was deployed")
    #block = w3.eth.getBlock(contractTx_blockNumber)
    #transaction0=block["transactions"][contractTx_transactionIndex]
    #print ("transaction hash = ", w3.toHex(transaction0))
    #address=w3.eth.getTransactionReceipt(transaction0)["contractAddress"]
    #print ("contract address = ", address)
    address = w3.toChecksumAddress(contractAddress);
    contract = w3.eth.contract(address=address, abi=abi)
    print (contract)
   
    print("unlock account:", unlockAccount(w3.eth.accounts[0]))

    # pprint (dir(contract))
    return contract


def contract_set_via_web3(contract, arg, privateFor=PRIVATE_FOR, gas=90000):
    """
    call the .set(arg) method, possibly with 'privateFor' tx-property
    using the web3 method 
    """
    txParameters = {'from': w3.eth.accounts[0], #w3.eth.coinbase,
                    'gas' : gas}
    if privateFor:
        txParameters['privateFor'] = privateFor  # untested
        
    # pprint (txParameters)
    print("arg 0 ",arg);    
    #tx = contract.functions.createPO( _poId=arg[0],_data=arg[1] ).transact(txParameters)
    tx = contract.functions.transfer( to=arg[0],value=arg[1] ).transact(txParameters)
    print ("[sent via web3]", end=" ")
    tx = w3.toHex(tx)
    return tx


def test_contract_set_via_web3(contract):
    """
    test the above
    """
    tx = contract_set_via_web3(contract, arg=2)
    print (tx)
    #storedData = contract.functions.get().call()
    #print (storedData) 


## Manually build & submit transaction, i.e. not going though web3
## (the hope of @jpmsam was that this would speed it up) 
## 
## Later I realized that data compilation steps are already implemented as
## myContract.functions.myMethod(*args, **kwargs).buildTransaction(transaction)


def contract_method_ID(methodname, abi):
    """
    build the 4 byte ID, from abi & methodname
    """
    method_abi = filter_by_name(methodname, abi)
    assert(len(method_abi)==1)
    method_abi = method_abi[0]
    method_signature = abi_to_signature(method_abi) 
    method_signature_hash_bytes = w3.sha3(text=method_signature) 
    method_signature_hash_hex = w3.toHex(method_signature_hash_bytes)
    method_signature_hash_4bytes = method_signature_hash_hex[0:10]
    return method_signature_hash_4bytes


def argument_encoding(contract_method_ID, arg):
    """
    concatenate method ID + padded parameter
    """
    arg_hex = w3.toHex(arg)
    arg_hex_padded = pad_hex ( arg_hex, bit_size=256)
    data = contract_method_ID + arg_hex_padded [2:]
    return data
    
    
def test_argument_encoding():
    """
    test the above:
    'Doing that 10000 times ... took 0.45 seconds'
    """
    timer = time.clock()
    reps = 10000
    for i in range(reps):
        method_ID = contract_method_ID("set", ABI)
        data = argument_encoding(method_ID, 7)
    timer = time.clock() - timer
    print (data)
    # no need to precalculate, it takes near to no time:
    print ("Doing that %d times ... took %.2f seconds" % (reps, timer) )


def contract_set_via_RPC(contract, arg, privateFor=PRIVATE_FOR, gas=90000):
    """
    call the .set(arg) method 
    not going through web3
    but directly via RPC
    
    suggestion by @jpmsam 
    https://github.com/jpmorganchase/quorum/issues/346#issuecomment-382216968
    """
    
    method_ID = contract_method_ID("createPO", contract.abi)
    data = argument_encoding(method_ID, arg)
    txParameters = {'from': w3.eth.coinbase, 
                    'to' : contract.address,
                    'gas' : w3.toHex(gas),
                    'data' : data} 
    if privateFor:
        txParameters['privateFor'] = privateFor  # untested
    
    method = 'eth_sendTransaction'
    payload= {"jsonrpc" : "2.0",
               "method" : method,
               "params" : [txParameters],
               "id"     : 1}
    headers = {'Content-type' : 'application/json'}
    response = requests.post(RPCaddress, json=payload, headers=headers)
    # print('raw json response: {}'.format(response.json()))
    tx = response.json()['result']
        
    print ("[sent directly via RPC]", end=" ")
    return tx


def test_contract_set_via_RPC(contract, steps=3):
    """
    test the above, write 3 transactions, and check the storedData
    """
    rand = random.randint(1, 100)
    for number in range(rand, rand+steps):
        tx = contract_set_via_RPC(contract, [number,"name"])
        print ("after set(%d) tx" % number, tx, " the storedData now is", end=" ")
        
    
    
    
# CHOOSE which route to choose (web3 / RPC) depending on constant ROUTE
contract_set = contract_set_via_web3   if ROUTE=="web3" else contract_set_via_RPC


################################################################
### 
### benchmarking routines 
###
### 0 blocking
### 1 async 
### 2 async, queue, can give number of workers
### 3 async, batched (obsolete)
###
################################################################


def many_transactions(contract, howMany):
    """
    naive approach, blocking --> 15 TPS
    """
    
    print ("send %d transactions, non-async, one after the other:\n" % (howMany))

    for i in range(howMany):
        tx = contract_set(contract, [w3.toChecksumAddress("0x2b2de645d65730b1d3042fd0d825d4cd03e3dc72"),1000000000])
        print ("set() transaction submitted: ", tx) # Web3.toHex(tx)) # new web3


###########################################################
###
### choose, depending on CLI parameter
###
###########################################################

def benchmark():

    print("\nBlockNumber = ", w3.eth.blockNumber)
    
    many_transactions(contract,1000)


if __name__ == '__main__':

    # HTTP provider 
    # (TODO: try IPC provider, when quorum-outside-vagrant starts working)
    global w3
    w3 = Web3(HTTPProvider(RPCaddress, request_kwargs={'timeout': 120}))
    # test_argument_encoding(); exit()
    from web3.middleware import geth_poa_middleware
# inject the poa compatibility middleware to the innermost layer
    w3.middleware_stack.inject(geth_poa_middleware, layer=0)
 
    addresses = ["0xa0d03306e9945c6c7118a9270abc3d26f6bde998"]
    for addr in addresses:
        contract = initialize(1,0,addr)
        benchmark()


