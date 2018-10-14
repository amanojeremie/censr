const { spawn } = require('child_process');
const net = require('net');

let muted = false;
let muteQueue = 0;


const client = net.createConnection({ port: 8124, host: '192.168.152.136' }, () => {
  // 'connect' listener
  console.log('connected to server!');
});

function mute() {
  if(!muted) {
    let proc = spawn('java', ['SimulateKeyStroke']);
    muted = true;
    proc.on('exit', () => {
      muted = false;
      if(muteQueue > 0) {
        console.log(muteQueue);
        mute();
        muteQueue - 1;
      }
    });
  }
  else {
    muteQueue++;
  }
  
}

client.on('data', (data) => {
  console.log(data.toString());
  mute();
});
client.on('end', () => {
  console.log('disconnected from server');
});
