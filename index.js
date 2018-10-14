// const record = require('node-record-lpcm16')
// const Speaker = require('speaker');
const net = require('net');

// Create the Speaker instance
// const speaker = new Speaker({
//   channels: 1,          // 2 channels
//   bitDepth: 16,         // 16-bit samples
//   sampleRate: 82000 * 2.4     // 44,100 Hz sample rate
// });


// const recordOpts = {
//   recordProgram: 'rec',
//   device: 'External Microphone',
//   silence: 10000,
//   sampleRate: 41000,  // audio sample rate
//   channels: 2,
// }

// let toggle = false;
// let recordStr, c;
let klient;
const server = net.createServer((c) => {
  // 'connection' listener
  klient = c;
  // c.write('Echo server\r\n');
  // c.pipe(c);
  console.log('client connected');
  c.on('data', (data) => {
    console.log(data.toString());
  });
  c.on('end', () => {
    console.log('client disconnected');
  });
  // recordStr = record.start(recordOpts);
  // c.write(Buffer.alloc(82000 * 2.4 * 10));
  // recordStr.pipe(c)

  // setInterval(function () {
  //   toggle = !toggle;
  //   console.log(toggle);
  //   if (toggle) {
  //     //recordStr.pause();
  //   }
  //   else {
  //     c.pause();
  //     c.write(Buffer.alloc(82000 * 2.4 * 10));
  //     c.resume();
  //   }
  // }, 10000)
});
server.on('error', (err) => {
  throw err;
});
server.listen(8124, () => {
  console.log('server bound');
});

// ググる

const baddies = ["pineapple", "apple", "Apple"];

const record = require('node-record-lpcm16');

// Imports the Google Cloud client library
const speech = require('@google-cloud/speech').v1p1beta1;

// Creates a client
const client = new speech.SpeechClient();

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
const encoding = 'LINEAR16';
const sampleRateHertz = 16000;
const languageCode = 'en-US';

const request = {
  config: {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
    enableWordConfidence: true,
  },
  interimResults: false, // If you want interim results, set this to true
};

var triggered;

// Create a recognize stream
const recognizeStream = client
  .streamingRecognize(request)
  .on('error', console.error)
  .on('data', data => {
    triggered = false;
    process.stdout.write(
      data.results[0] && data.results[0].alternatives[0]
        ? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
        : `\n\nReached transcription time limit, press Ctrl+C\n`
    );
    data.results[0].alternatives[0].words.forEach(entry => {
      if (baddies.includes(entry.word)) {
        triggered = true;
        // console.log("holy schnikes Batman! you said a swears: " + entry.word);
        if (klient) {
          klient.write("holy schnikes Batman! you said a swears: " + entry.word);
        }
      }
    });
    triggered ? null : console.log("good child.");
  }
  );

// Start recording and send the microphone input to the Speech API
record
  .start({
    sampleRateHertz: sampleRateHertz,
    threshold: 0,
    // Other options, see https://www.npmjs.com/package/node-record-lpcm16#options
    verbose: false,
    recordProgram: 'rec', // Try also "arecord" or "sox"
    silence: '10.0',
  })
  .on('error', console.error)
  .pipe(recognizeStream);

console.log('Listening, press Ctrl+C to stop.');