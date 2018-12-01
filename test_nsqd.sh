#!/bin/bash

NSQ_URL='http://poc.chat:4151/'




function iprintf {
    echo -e "\033[0;32m$(date +"%Y.%m.%d %H:%M:%S")\t$@\033[0m"
}
function eprintf {
    echo -e "\033[0;31m$(date +"%Y.%m.%d %H:%M:%S")\t$@\033[0m"
}

function check_nsq {
    msg="${1}"
    api="${2}"
    request="${3}"
    data="${4}"

    if [[ "POST" == "${request}" ]]; then
        http_code=$(curl -XPOST -d "${data}" -s -o /dev/null -w '%{http_code}' "${NSQ_URL}/${api}")
    elif [[ "GET" == "${request}" ]]; then
        http_code=$(curl -XGET -s -o /dev/null -w '%{http_code}' "${NSQ_URL}/${api}")
    else
        eprintf "Not set request type. Args №2"
    fi

    if [[ "200" == "${http_code}" ]]; then
        iprintf "[${http_code}] ${msg}"
    else
        eprintf "[${http_code}] ${msg}"
        exit 1
    fi
}


### Starting tests...

check_nsq "Check ping" "ping" "GET"
## Create topic
check_nsq "Create topic: general" "topic/create?topic=general" "POST"
## Then create channel
check_nsq "Create channel: general" "channel/create?topic=general&channel=1" "POST"
check_nsq "Create channel: general" "channel/create?topic=general&channel=2" "POST"
## Then post few messages to general topic
check_nsq "Create message: general" "pub?topic=general" "POST" "mymessage1"
check_nsq "Create message: general" "pub?topic=general" "POST" "mymessage2"
check_nsq "Create message: general" "pub?topic=general" "POST" "mymessage3"
## Get stats
check_nsq "Get stats" "stats" "GET"
iprintf "\n$(curl -s ${NSQ_URL}/stats)"

