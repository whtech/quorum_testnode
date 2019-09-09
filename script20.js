a = eth.accounts[0]
web3.eth.defaultAccount = a;

// abi and bytecode generated from simplestorage.sol:
// > solcjs --bin --abi simplestorage.sol
var abi = [    {      "constant": true,      "inputs": [],      "name": "name",      "outputs": [        {          "name": "",          "type": "string"        }      ],      "payable": false,      "stateMutability": "view",      "type": "function"    },    {      "constant": false,      "inputs": [        {          "name": "spender",          "type": "address"        },        {          "name": "value",          "type": "uint256"        }      ],      "name": "approve",      "outputs": [        {          "name": "",          "type": "bool"        }      ],      "payable": false,      "stateMutability": "nonpayable",      "type": "function"    },    {      "constant": true,      "inputs": [],      "name": "totalSupply",      "outputs": [        {          "name": "",          "type": "uint256"        }      ],      "payable": false,      "stateMutability": "view",      "type": "function"    },    {      "constant": false,      "inputs": [        {          "name": "from",          "type": "address"        },        {          "name": "to",          "type": "address"        },        {          "name": "value",          "type": "uint256"        }      ],      "name": "transferFrom",      "outputs": [        {          "name": "",          "type": "bool"        }      ],      "payable": false,      "stateMutability": "nonpayable",      "type": "function"    },    {      "constant": true,      "inputs": [],      "name": "decimals",      "outputs": [        {          "name": "",          "type": "uint8"        }      ],      "payable": false,      "stateMutability": "view",      "type": "function"    },    {      "constant": false,      "inputs": [        {          "name": "spender",          "type": "address"        },        {          "name": "addedValue",          "type": "uint256"        }      ],      "name": "increaseAllowance",      "outputs": [        {          "name": "",          "type": "bool"        }      ],      "payable": false,      "stateMutability": "nonpayable",      "type": "function"    },    {      "constant": true,      "inputs": [        {          "name": "owner",          "type": "address"        }      ],      "name": "balanceOf",      "outputs": [        {          "name": "",          "type": "uint256"        }      ],      "payable": false,      "stateMutability": "view",      "type": "function"    },    {      "constant": true,      "inputs": [],      "name": "symbol",      "outputs": [        {          "name": "",          "type": "string"        }      ],      "payable": false,      "stateMutability": "view",      "type": "function"    },    {      "constant": false,      "inputs": [        {          "name": "spender",          "type": "address"        },        {          "name": "subtractedValue",          "type": "uint256"        }      ],      "name": "decreaseAllowance",      "outputs": [        {          "name": "",          "type": "bool"        }      ],      "payable": false,      "stateMutability": "nonpayable",      "type": "function"    },    {      "constant": false,      "inputs": [        {          "name": "to",          "type": "address"        },        {          "name": "value",          "type": "uint256"        }      ],      "name": "transfer",      "outputs": [        {          "name": "",          "type": "bool"        }      ],      "payable": false,      "stateMutability": "nonpayable",      "type": "function"    },    {      "constant": true,      "inputs": [        {          "name": "owner",          "type": "address"        },        {          "name": "spender",          "type": "address"        }      ],      "name": "allowance",      "outputs": [        {          "name": "",          "type": "uint256"        }      ],      "payable": false,      "stateMutability": "view",      "type": "function"    },    {      "inputs": [],      "payable": false,      "stateMutability": "nonpayable",      "type": "constructor"    },    {      "anonymous": false,      "inputs": [        {          "indexed": true,          "name": "from",          "type": "address"        },        {          "indexed": true,          "name": "to",          "type": "address"        },        {          "indexed": false,          "name": "value",          "type": "uint256"        }      ],      "name": "Transfer",      "type": "event"    },    {      "anonymous": false,      "inputs": [        {          "indexed": true,          "name": "owner",          "type": "address"        },        {          "indexed": true,          "name": "spender",          "type": "address"        },        {          "indexed": false,          "name": "value",          "type": "uint256"        }      ],      "name": "Approval",      "type": "event"    }  ]

var bytecode = "0x60806040523480156200001157600080fd5b506040518060400160405280600981526020017f54657374546f6b656e00000000000000000000000000000000000000000000008152506040518060400160405280600281526020017f5454000000000000000000000000000000000000000000000000000000000000815250601282600390805190602001906200009892919062000299565b508160049080519060200190620000b192919062000299565b5080600560006101000a81548160ff021916908360ff160217905550505050620000fb33620000e56200010160201b60201c565b60ff16600a0a612710026200011860201b60201c565b62000348565b6000600560009054906101000a900460ff16905090565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156200015357600080fd5b6200016f816002546200027960201b62000c8a1790919060201c565b600281905550620001cd816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546200027960201b62000c8a1790919060201c565b6000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a35050565b6000808284019050838110156200028f57600080fd5b8091505092915050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620002dc57805160ff19168380011785556200030d565b828001600101855582156200030d579182015b828111156200030c578251825591602001919060010190620002ef565b5b5090506200031c919062000320565b5090565b6200034591905b808211156200034157600081600090555060010162000327565b5090565b90565b610cd580620003586000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c80633950935111610071578063395093511461025f57806370a08231146102c557806395d89b411461031d578063a457c2d7146103a0578063a9059cbb14610406578063dd62ed3e1461046c576100a9565b806306fdde03146100ae578063095ea7b31461013157806318160ddd1461019757806323b872dd146101b5578063313ce5671461023b575b600080fd5b6100b66104e4565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100f65780820151818401526020810190506100db565b50505050905090810190601f1680156101235780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61017d6004803603604081101561014757600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610586565b604051808215151515815260200191505060405180910390f35b61019f61059d565b6040518082815260200191505060405180910390f35b610221600480360360608110156101cb57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506105a7565b604051808215151515815260200191505060405180910390f35b610243610658565b604051808260ff1660ff16815260200191505060405180910390f35b6102ab6004803603604081101561027557600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061066f565b604051808215151515815260200191505060405180910390f35b610307600480360360208110156102db57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610714565b6040518082815260200191505060405180910390f35b61032561075c565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561036557808201518184015260208101905061034a565b50505050905090810190601f1680156103925780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6103ec600480360360408110156103b657600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506107fe565b604051808215151515815260200191505060405180910390f35b6104526004803603604081101561041c57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506108a3565b604051808215151515815260200191505060405180910390f35b6104ce6004803603604081101561048257600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506108ba565b6040518082815260200191505060405180910390f35b606060038054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561057c5780601f106105515761010080835404028352916020019161057c565b820191906000526020600020905b81548152906001019060200180831161055f57829003601f168201915b5050505050905090565b6000610593338484610941565b6001905092915050565b6000600254905090565b60006105b4848484610aa0565b61064d843361064885600160008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610c6a90919063ffffffff16565b610941565b600190509392505050565b6000600560009054906101000a900460ff16905090565b600061070a338461070585600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610c8a90919063ffffffff16565b610941565b6001905092915050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b606060048054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156107f45780601f106107c9576101008083540402835291602001916107f4565b820191906000526020600020905b8154815290600101906020018083116107d757829003601f168201915b5050505050905090565b6000610899338461089485600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610c6a90919063ffffffff16565b610941565b6001905092915050565b60006108b0338484610aa0565b6001905092915050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141561097b57600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614156109b557600080fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925836040518082815260200191505060405180910390a3505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610ada57600080fd5b610b2b816000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610c6a90919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610bbe816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610c8a90919063ffffffff16565b6000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a3505050565b600082821115610c7957600080fd5b600082840390508091505092915050565b600080828401905083811015610c9f57600080fd5b809150509291505056fea165627a7a72305820f4d4ccf40fe67b8de9c6a49917c21f6690b53cbb4f961d9496b6115934cfdf2d0029";


var simpleContract = web3.eth.contract(abi);
var simple = simpleContract.new({from:web3.eth.accounts[0], data: bytecode, gas: 0x47b760 }, function(e, contract) {
	if (e) {
		console.log("err creating contract", e);
	} else {
		if (!contract.address) {
			console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");
		} else {
			console.log("Contract mined! Address: " + contract.address);
			console.log(contract);
		}
	}
});

