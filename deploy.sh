#!/bin/sh

if [ -f dev_envr ]; then
    certificate='../gitlabci.pem'
    path='.'
else
    certificate='${CI_GITLAB_KEY}'
    path='${CI_PROJECT_DIR}'
fi

#scp -i "$certificate" api/server/index.js api/server/queries.js api/server/routers.js gitlabci@192.168.75.17:/opt/backend
ls -la "$path"
scp -i "$certificate" "$path"/test_file.txt gitlabci@192.168.75.17:/opt/backend