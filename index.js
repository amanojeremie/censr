var record = require('node-record-lpcm16')
const Speaker = require('speaker');

// Create the Speaker instance
const speaker = new Speaker({
  channels: 2,          // 2 channels
  bitDepth: 16,         // 16-bit samples
  sampleRate: 44100     // 44,100 Hz sample rate
});

record.start({recordProgram : 'sox', verbose: true}).pipe(speaker)

setTimeout(function () {
  record.stop()
}, 3000)