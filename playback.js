const Speaker = require('speaker');
const net = require('net');

// Create the Speaker instance
const speaker = new Speaker({
  channels: 1,          // 2 channels
  bitDepth: 16,         // 16-bit samples
  sampleRate: 82000 * 2.4     // 44,100 Hz sample rate
});

const client = net.createConnection({ port: 8124 }, () => {
    // 'connect' listener
    console.log('connected to server!');
  });
  
  client.pipe(speaker);
  client.on('end', () => {
    console.log('disconnected from server');
});