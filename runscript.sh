#!/bin/bash
PRIVATE_CONFIG=qdata/c4/tm.ipc geth --exec "loadScript(\"$1\")" attach ipc:qdata/dd4/geth.ipc
