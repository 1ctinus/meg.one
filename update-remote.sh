#!/bin/sh

echo
echo 'Running remote update through SSH...'

ssh admin@jmoore.dev "cd ../nodejs/meg.one/ && npm run update"

&& echo 'Finished remote update'\
|| echo 'Failed remote update'

