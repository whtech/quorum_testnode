#!/bin/bash
set -u
set -e

    DDIR="qdata/c$3"
    mkdir -p $DDIR
    mkdir -p qdata/logs
    cp "keys/tm$3.pub" "$DDIR/tm.pub"
    cp "keys/tm$3.key" "$DDIR/tm.key"
    rm -f "$DDIR/tm.ipc"
    CMD="constellation-node --url=https://"$1":9001/ --port=9001 --workdir=$DDIR --socket=tm.ipc --publickeys=tm.pub --privatekeys=tm.key --othernodes=https://"$2":9001/"
    echo "$CMD >> qdata/logs/constellation$3.log 2>&1 &"
    $CMD >> "qdata/logs/constellation$3.log" 2>&1 &

DOWN=true
while $DOWN; do
    sleep 0.1
    DOWN=false
    if [ ! -S "qdata/c$3/tm.ipc" ]; then
            DOWN=true
    fi
done

