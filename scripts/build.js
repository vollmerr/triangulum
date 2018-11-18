const resolve = require('path').resolve;
const cp = require('child_process');
const os = require('os');
const chalk = require('chalk');

const clientPath = resolve(__dirname, '..', 'client');
console.log(`${chalk.magenta('Building client')}\n`);
// npm binary based on OS
const npmCmd = os.platform().startsWith('win') ? 'npm.cmd' : 'npm';
// build folder
return cp.spawn(npmCmd, ['run', 'build'], { env: process.env, cwd: clientPath, stdio: 'inherit' });
