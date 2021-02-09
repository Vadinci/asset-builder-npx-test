import * as fs from 'fs';

console.log("hello world!");
console.log(process.argv);

let files: string[] = fs.readdirSync('.');
files.forEach((file: string) => {
	console.log(file);
})