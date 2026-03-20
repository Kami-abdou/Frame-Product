#!/bin/bash
cd "$(dirname "$0")/.."
exec /usr/local/bin/node node_modules/next/dist/bin/next dev
