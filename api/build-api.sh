#!/bin/bash

set -eux

pushd .
echo "Current directory: $(pwd)"

echo "Running 'npm install'..."
npm install

echo "Running 'npm run build'..."
npm run build

echo "finsihed build"
popd
echo "Back to directory: $(pwd)"
