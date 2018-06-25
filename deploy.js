const FtpDeploy = require('ftp-deploy');
const credentials = require('./ftp-config.json');
const ftpDeploy = new FtpDeploy();

const config = {
  user: credentials.user,
  password: credentials.password,
  host: 'six',
  port: 21,
  localRoot: __dirname,
  remoteRoot: '/next-mobile/www/',
  include: ['*'],
  exclude: [
    'node_modules/**/*',
    '.git/**/*',
    '.idea/**/*',
    'src/**/*',
    'README.md',
    'accesses.txt',
    'deploy.js',
    'package-lock.json',
    'package.json',
    'webpack.config.js',
    'ftp-config.json',
  ],
};

ftpDeploy.deploy(config)
  .then(() => console.log('finished'))
  .catch(e => console.log(e));
