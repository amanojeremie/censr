const record = require('node-record-lpcm16')
const Speaker = require('speaker');
const net = require('net');

// Create the Speaker instance
const speaker = new Speaker({
  channels: 1,          // 2 channels
  bitDepth: 16,         // 16-bit samples
  sampleRate: 82000 * 2.4     // 44,100 Hz sample rate
});


const recordOpts = {
  recordProgram : 'sox',
  device: 'Mic', 
  silence: 10000,
  sampleRate    : 41000,  // audio sample rate
  channels      : 2,
}

const server = net.createServer((c) => {
  // 'connection' listener
  console.log('client connected');
  c.on('end', () => {
    console.log('client disconnected');
  });
  record.start(recordOpts).pipe(c);
});
server.on('error', (err) => {
  throw err;
});
server.listen(8124, () => {
  console.log('server bound');
});

setTimeout(function () {
  record.stop()
}, 60000000)