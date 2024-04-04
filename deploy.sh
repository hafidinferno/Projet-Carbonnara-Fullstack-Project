#!/bin/bash

if [ -f dev_envr ]; then
    certificate='../gitlabci.pem'
else
    certificate='${CI_GITLAB_KEY}'
fi

#scp -i "$certificate" api/server/index.js api/server/queries.js api/server/routers.js gitlabci@192.168.75.17:/opt/backend
scp -i "$certificate" test_file.txt gitlabci@192.168.75.17:/opt/backend