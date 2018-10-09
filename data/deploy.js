const path = require('path');
const fs = require('fs');
const FtpDeploy = require('ftp-deploy');
const credentials = require('./ftp-config.json');
const ftpDeploy = new FtpDeploy();
const folder = process.argv[2];
const type = process.argv[3];
const projectCredentials = credentials[type];

if (!folder) {
  throw new Error('Folder is empty');
}

const configMain = {
  user: projectCredentials.user,
  password: projectCredentials.password,
  host: projectCredentials.host,
  port: 21,
  localRoot: path.join(__dirname, '../www'),
  remoteRoot: `/${folder}/www/`,
  include: ['*.js', 'bundle.css', 'index.html', 'index.php'],
  exclude: [],
};

const configMedia = {
  user: projectCredentials.user,
  password: projectCredentials.password,
  host: projectCredentials.host,
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
  .catch(e => console.log(e))
  .finally(() => {
    fs.unlink('../www/0.js', () => {});
    fs.unlink('../www/bundle.js', () => {});
    fs.unlink('../www/bundle.css', () => {});
    fs.unlink('../www/index.html', () => {});
    fs.unlink('../www/index.php', () => {});
  });
