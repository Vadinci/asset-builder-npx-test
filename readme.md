# executable npm repo

## steps:
 * Set up a npm repo (`npm init`)
 * set up an output file. The 'standard' seemst to be something like `bin/cli.js`
 * the file needs to prefixed with the 'hashbang' `#!/usr/bin/env node`
 * the file needs to be executable (`chmod +x bin/cli.js`);
 * now add a 'bin' node to package.json. `"bin" : { "command-name-here" : "bin\cli.js" }`
 * if you now install the package within another npm repo, you can use the package via `npx command-name-here`.
 * any additional arguments passed after the command name end up in `process.argv` within the script that is being executed. There exists some packages that can help with parsing those process args, such as [yargs](https://www.npmjs.com/package/yargs). This allows us to use the command in forms like `npx cool-builder --rebuildAssets --maxTextureSize 1024`  


## solutions to some challenges
 assuming webpack is used:
 * the hashbang can be added to the output by using the `webpack.BannerPlugin`:
```js
plugins: [
	new webpack.BannerPlugin({
		banner: '#!/usr/bin/env node',
		raw: true
	})
]
``` 
  this will prefix the output file with the hashbang. Just adding the hashbang to the entry point for webpack will result in a build error.
 * webpack's output is not executable by default. It is easiest to create a npm command in package.json for building. `"build": "npx webpack && chmod +x bin/cli.js"`
 * in order to be able to use node packages such as 'fs' the `target` property in webpack.config.js has to be set to `"node"`. after that you'll be able to use the node modules in typescript, e.g. `import * as fs from 'fs';`


using `npm-link` can help quickly test the package without having to publish and download it. run `npm-link` in the root of the package you're working on. Then run `npm-link package-name-here` in the root of the package you want to try out the functionality in. `npm-link` also makes the package act as if it was installed globally, so you can test your command anywhere by just running `command-name-here` without the npx prefix as well. see [npm-link](https://docs.npmjs.com/cli/v6/commands/npm-link).


## example file
```ts
import * as fs from 'fs';

console.log("hello world!");
console.log(process.argv);

let files: string[] = fs.readdirSync('.');
files.forEach((file: string) => {
	console.log(file);
})
```

if run in a new npm folder (via `npx npx-test foo bar` in this case), the output is as follows:
```
hello world!
[
  '/usr/local/bin/node',
  '/Users/CoolGames/git/OTHER/test-package/node_modules/.bin/npx-test',
  'foo',
  'bar'
]
.git
.gitignore
node_modules
package-lock.json
package.json
```