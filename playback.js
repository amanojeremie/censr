const { spawn } = require('child_process');
const net = require('net');

const client = net.createConnection({ port: 8124 }, () => {
  // 'connect' listener
  console.log('connected to server!');
});

client.on('data', (data) => {
  console.log(data.toString());
  spawn('java', ['SimulateKeyStroke']);
});
client.on('end', () => {
  console.log('disconnected from server');
});
