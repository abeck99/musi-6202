#!/bin/bash

yarn build-fa-css
decktape dist/class-00.html dist/class-00.pdf
decktape dist/class-01.html dist/class-01.pdf
decktape dist/class-02.html dist/class-02.pdf
