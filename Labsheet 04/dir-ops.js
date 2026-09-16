const fs = require('fs');

fs.mkdir('uploads', { recursive: true }, (err) => {
    if (err) throw err;

    fs.writeFile('uploads/file1.txt', '', (err) => {
        if (err) throw err;

        fs.writeFile('uploads/file2.txt', '', (err) => {
            if (err) throw err;

            fs.writeFile('uploads/file3.txt', '', (err) => {
                if (err) throw err;

                fs.readdir('uploads', (err, files) => {
                    if (err) throw err;

                    console.log('Files:', files);

                    fs.unlink('uploads/file3.txt', (err) => {
                        if (err) throw err;

                        console.log('file3.txt deleted.');
                    });
                });
            });
        });
    });
});