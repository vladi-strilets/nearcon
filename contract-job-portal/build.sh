#!/bin/sh

echo ">> Building contract"

rm -rf build \
&& near-sdk-js build src/job-portal.ts build/job-portal.wasm
