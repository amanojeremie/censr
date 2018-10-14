const net = require('net');
let klient;
const server = net.createServer((c) => {
  // 'connection' listener
  klient = c;
  console.log('client connected');
  c.on('data', (data) => {
    console.log(data.toString());
  });
  c.on('end', () => {
    console.log('client disconnected');
  });
});
server.on('error', (err) => {
  throw err;
});
server.listen(8124, () => {
  console.log('server bound');
});

// ググる

const baddies = ["apple"];
const record = require('node-record-lpcm16');

// Imports the Google Cloud client library
const speech = require('@google-cloud/speech').v1p1beta1;

// Creates a client
const client = new speech.SpeechClient();

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
  interimResults: true, // If you want interim results, set this to true
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
    baddies.forEach((bad) => {
      let words = data.results[0].alternatives[0].transcript.split(' ');
      if (words[words.length - 1].indexOf(bad) != -1) {
        triggered = true;
        console.log("holy schnikes Batman! you said a swears: " + bad);
        if (klient) {
          klient.write("holy schnikes Batman! you said a swears: " + bad);
        }
      }
    })
  });

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
