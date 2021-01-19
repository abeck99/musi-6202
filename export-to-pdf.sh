#!/bin/bash

yarn build-fa-svg
decktape dist/index.html dist/class-00.pdf
