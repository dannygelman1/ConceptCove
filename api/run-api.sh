#!/bin/bash
set -eux

pushd .
echo "echo "started RUN: Current directory: $(pwd)""

node dist/main

popd
