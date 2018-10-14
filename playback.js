// const Speaker = require('speaker');
const { spawn } = require('child_process');
const net = require('net');

// Create the Speaker instance
// const speaker = new Speaker({
//   channels: 1,          // 2 channels
//   bitDepth: 16,         // 16-bit samples
//   sampleRate: 82000 * 2.4     // 44,100 Hz sample rate
// });

const client = net.createConnection({ port: 8124 }, () => {
  // 'connect' listener
  console.log('connected to server!');
  // client.write('Hello, server! Love, Client.');
});

//speaker.write(Buffer.alloc(82000 * 2.4 * 10));
// client.pipe(speaker);
client.on('data', (data) => {
  console.log(data.toString());
  spawn('java', ['SimulateKeyStroke.jar']);
});
client.on('end', () => {
  console.log('disconnected from server');
});