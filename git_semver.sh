#! /bin/bash

FIRST=$(git describe --tags | awk '{split($0,a,"-"); print a[1]}')&& FIRST=$(echo $FIRST | cut -d "v" -f 2)
SECOND=$(git describe --tags | awk '{split($0,a,"-"); print a[2]}')
DIV=$([ -z "$SECOND" ] || echo ".")
echo $FIRST$DIV$SECOND