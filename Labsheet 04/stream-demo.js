const fs = require('fs');

let content = '';

for (let i = 1; i <= 50; i++) {
    content += `This is line ${i}\n`;
}

fs.writeFileSync('large-file.txt', content);

const stream = fs.createReadStream('large-file.txt');

stream.on('data', (chunk) => {
    console.log("Chunk size:", chunk.length, "bytes");
});

stream.on('end', () => {
    console.log("Finished reading file.");
});