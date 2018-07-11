const path = require('path');
const FtpDeploy = require('ftp-deploy');
const credentials = require('./ftp-config.json');
const ftpDeploy = new FtpDeploy();

const configMain = {
  user: credentials.user,
  password: credentials.password,
  host: 'six',
  port: 21,
  localRoot: path.join(__dirname, 'dist'),
  remoteRoot: '/next-mobile/www/',
  include: ['bundle.js', 'bundle.css', 'index.html'],
  exclude: [],
};

const configMedia = {
  user: credentials.user,
  password: credentials.password,
  host: 'six',
  port: 21,
  localRoot: __dirname,
  remoteRoot: '/next-mobile/www/',
  include: ['media/**/*.*'],
  exclude: [],
};

const configData = {
  user: credentials.user,
  password: credentials.password,
  host: 'six',
  port: 21,
  localRoot: __dirname,
  remoteRoot: '/next-mobile/www/',
  include: ['data/**/*.*'],
  exclude: [],
};

ftpDeploy.on('uploading', (data) => {
  console.log(data.filename);
});

ftpDeploy.deploy(configMain)
  .then(() => ftpDeploy.deploy(configMedia))
  .then(() => ftpDeploy.deploy(configData))
  .then(() => console.log('Finished', (new Date()).toLocaleString()))
  .catch(e => console.log(e));
