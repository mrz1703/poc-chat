#!/bin/bash

alias dc=docker-compose;
alias curl=/usr/bin/curl;

dc down;
dc pull;
dc up -d;

# Create topic via nsqd daemon first

curl -X POST 'http://127.0.0.1:4151/topic/create?topic=general'
echo;

# Then create channel

curl -X POST 'http://127.0.0.1:4151/channel/create?topic=general&channel=1'
echo
curl -X POST 'http://127.0.0.1:4151/channel/create?topic=general&channel=2'
echo

# Then post few messages to general topic

curl -X POST -d 'mymessage1' 'http://127.0.0.1:4151/pub?topic=general'
echo
curl -X POST -d 'mymessage2' 'http://127.0.0.1:4151/pub?topic=general'
echo
curl -X POST -d 'mymessage3' 'http://127.0.0.1:4151/pub?topic=general'
echo

# Get stats

curl http://127.0.0.1:4151/stats
