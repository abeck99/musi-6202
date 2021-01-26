#!/bin/bash

youtube-dl -f 140 "https://www.youtube.com/watch?v=6zTc2hD2npA" -o temp.m4a
ffmpeg -i temp.m4a temp.wav
