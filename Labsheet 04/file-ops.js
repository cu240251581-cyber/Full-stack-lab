const fs = require('fs');

fs.writeFile('student.txt', 'Name: Diksha Saini\nRoll No: CU240251581\n', (err) => {
    if (err) throw err;

    fs.appendFile(
        'student.txt',
        'Course: Full Stack Web Development\n',
        (err) => {
            if (err) throw err;

            fs.readFile('student.txt', 'utf8', (err, data) => {
                if (err) throw err;

                console.log(data);

                fs.rename('student.txt', 'profile.txt', (err) => {
                    if (err) throw err;

                    console.log('File renamed successfully.');
                });
            });
        }
    );
});