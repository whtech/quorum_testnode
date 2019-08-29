#!/bin/bash
set -u
set -e

a=`bootnode --nodekey=raft/nodekey$3 --writeaddress`
echo $a

echo '[
  "enode://ac6b1096ca56b9f6d004b779ae3728bf83f8e22453404cc3cef16a3d9b96608bc67c4b30db88e0a5a6c6390213f7acbe1153ff6d23ce57380104288ae19373ef@'$1':21000?discport=0&raftport=50401",
  "enode://'$a'@'$2':21000?discport=0&raftport=50401"
]' > permissioned-nodes.json

echo "[*] Cleaning up temporary data directories"
rm -rf qdata
mkdir -p qdata/logs

echo "[*] Configuring node 1 (permissioned)"
mkdir -p qdata/dd$3/{keystore,geth}
cp permissioned-nodes.json qdata/dd$3/static-nodes.json
cp permissioned-nodes.json qdata/dd$3/
cp keys/key$3 qdata/dd$3/keystore
cp raft/nodekey$3 qdata/dd$3/geth/nodekey
geth --datadir qdata/dd$3 init genesis.json


