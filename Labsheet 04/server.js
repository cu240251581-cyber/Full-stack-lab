const http = require('http');
const url = require('url');

const students = [
    {
        id: 1,
        name: 'Rahul',
        course: 'CSE'
    },
    {
        id: 2,
        name: 'Priya',
        course: 'CSE'
    },
    {
        id: 3,
        name: 'Aman',
        course: 'CSE'
    }
];

const server = http.createServer((req, res) => {

    // GET /
    if (req.method === 'GET' && req.url === '/') {

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.end('Welcome to Student API');
    }

    // GET /students
    else if (req.method === 'GET' && req.url === '/students') {

        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify(students));
    }

    // GET /students/:id
    else if (
        req.method === 'GET' &&
        req.url.startsWith('/students/')
    ) {

        const id = parseInt(req.url.split('/')[2]);

        const student = students.find(
            student => student.id === id
        );

        if (student) {

            res.writeHead(200, {
                'Content-Type': 'application/json'
            });

            res.end(JSON.stringify(student));

        } else {

            res.writeHead(404, {
                'Content-Type': 'application/json'
            });

            res.end(JSON.stringify({
                error: 'Student not found'
            }));
        }
    }

    // GET /search?keyword=node
    else if (req.url.startsWith('/search')) {

        const parsedUrl = url.parse(req.url, true);

        const keyword = parsedUrl.query.keyword;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.end(`Search keyword: ${keyword}`);
    }

    // Any other route
    else {

        res.writeHead(404, {
            'Content-Type': 'text/html'
        });

        res.end('<h1>404 - Page Not Found</h1>');
    }
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});