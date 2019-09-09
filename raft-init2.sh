#!/bin/bash
set -u
set -e

echo '[
  "enode://ac6b1096ca56b9f6d004b779ae3728bf83f8e22453404cc3cef16a3d9b96608bc67c4b30db88e0a5a6c6390213f7acbe1153ff6d23ce57380104288ae19373ef@172.24.162.51:21000?discport=0&raftport=50401",'>permissioned-nodes.json

for i in {2..9}
do
a=`bootnode --nodekey=raft/nodekey$i --writeaddress`
echo $a
if test $i -ge 9; then
echo '  "enode://'$a'@172.24.162.5'$i':21000?discport=0&raftport=50401"' >> permissioned-nodes.json
else
echo '  "enode://'$a'@172.24.162.5'$i':21000?discport=0&raftport=50401",' >> permissioned-nodes.json
fi
done

echo ']'>> permissioned-nodes.json

echo "[*] Cleaning up temporary data directories"
rm -rf qdata
mkdir -p qdata/logs
for i in {1..9}
do
echo "[*] Configuring node '$i' (permissioned)"
mkdir -p qdata/dd$i/{keystore,geth}
cp permissioned-nodes.json qdata/dd$i/static-nodes.json
cp permissioned-nodes.json qdata/dd$i/
cp keys/key$i qdata/dd$i/keystore
cp raft/nodekey$i qdata/dd$i/geth/nodekey
geth --datadir qdata/dd$i init genesis.json
done

