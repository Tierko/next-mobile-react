const path = require('path');
const FtpDeploy = require('ftp-deploy');
const credentials = require('./ftp-config.json');
const ftpDeploy = new FtpDeploy();
const folder = process.argv[2];

if (!folder) {
  throw new Error('Folder is empty');
}

const configMain = {
  user: credentials.user,
  password: credentials.password,
  host: 'six',
  port: 21,
  localRoot: path.join(__dirname, 'dist'),
  remoteRoot: `/${folder}/www/`,
  include: ['*.js', 'bundle.css', 'index.html'],
  exclude: [],
};

const configMedia = {
  user: credentials.user,
  password: credentials.password,
  host: 'six',
  port: 21,
  localRoot: __dirname,
  remoteRoot: `/${folder}/www/`,
  include: ['media/**/*.*'],
  exclude: [],
};

ftpDeploy.on('uploading', (data) => {
  console.log(data.filename);
});

ftpDeploy.deploy(configMain)
  .then(() => ftpDeploy.deploy(configMedia))
  .then(() => console.log('Finished', (new Date()).toLocaleString()))
  .catch(e => console.log(e));
