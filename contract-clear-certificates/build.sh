#!/bin/sh

echo ">> Building contract"

rm -rf build \
&& near-sdk-js build src/clear-certificates.ts build/clear-certificates.wasm
