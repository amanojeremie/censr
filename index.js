var record = require('node-record-lpcm16')
const Speaker = require('speaker');
const fs = require('fs');

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
record.start(recordOpts).pipe(speaker)

setTimeout(function () {
  record.stop()
}, 60000000)