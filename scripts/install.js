// installs client and server pacakges
// https://stackoverflow.com/questions/31773546/the-best-way-to-run-npm-install-for-nested-folders
const fs = require('fs');
const resolve = require('path').resolve;
const join = require('path').join;
const cp = require('child_process');
const os = require('os');
const chalk = require('chalk');

// get base path
const lib = resolve(__dirname, '../');

fs.readdirSync(lib)
  .forEach(function (mod) {
    const modPath = join(lib, mod);
    // ensure path has package.json
    if (!fs.existsSync(join(modPath, 'package.json'))) return;
    console.log(`Installing ${chalk.magenta(modPath)}\n`);
    // npm binary based on OS
    const npmCmd = os.platform().startsWith('win') ? 'npm.cmd' : 'npm';
    // install folder
    cp.spawn(npmCmd, ['i'], { env: process.env, cwd: modPath, stdio: 'inherit' });
  });
