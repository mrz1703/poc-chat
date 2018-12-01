/**
 * @module services/nsq
 */

'use strict';

const util   = require('util');
const events = require('events');
const nsq    = require('nsqjs');

console.log(events);

const CHANNEL = '1';
const TOPIC   = 'general';

const reader = new nsq.Reader(TOPIC, CHANNEL, {nsqdTCPAddresses: '127.0.0.1:4150'});


reader.connect();
reader.on('message', function (msg) {
    console.log(msg.rawMessage.toString());
});

reader.on('nsqd_connected', function (...args) {
    console.log('READER CONNECTED', args);
});

reader.on('nsqd_closed', function (...args) {
    console.log('READER CLOSED', args);
});

const writer = new nsq.Writer('127.0.0.1', 4150);

writer.connect();
writer.on('ready', function (...args) {
    console.log('WORKER READY', args);

    writer.publish(TOPIC, 'hahah new message lol');
});

// const writer = new nsq.Writer('127.0.0.1', 4150)
//
// writer.connect()
// writer.on('ready', () => {
//     writer.publish(TOPIC, 'it really tied the room together');
//     writer.deferPublish(TOPIC, ['This message gonna arrive 1 sec later.'], 1000);
//     writer.publish(TOPIC, [
//         'Uh, excuse me. Mark it zero. Next frame.',
//         'Smokey, this is not \'Nam. This is bowling. There are rules.'
//     ]);
//
//     writer.publish(TOPIC, 'Wu?',  err => {
//         if (err) {
//             return console.error(err.message) ;
//         }
//
//         console.log('Message sent successfully');
//         writer.close();
//     });
// })
//
//     writer.on('closed', () => {
//   console.log('Writer closed')
// })
