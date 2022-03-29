const http = require("http");
const fs = require("fs");

let allFiles = new Map();
allFiles.set("/", "./index.html");
allFiles.set("/about", "./about.html");
allFiles.set("/contact-me", "./contact-me.html");

//let indexFile;

const port = 3000;

const server = http.createServer();

server.on("request", (request, res) => {
    if(request.url === "/stylesheet.css"){
        res.setHeader("Content-Type", "text/css");
        const content = fs.readFileSync("./stylesheet.css", "utf8");
        res.statusCode = 200;
        res.end(content);
    }else{
        res.setHeader("Content-Type", "text/html");
        let filename = allFiles.get(request.url);
        if (filename !== undefined) {
            const content = fs.readFileSync(filename, "utf8");
            res.statusCode = 200;
            res.end(content);
        } else {
            const content = fs.readFileSync("./404.html", "utf8");
            res.statusCode = 404;
            res.end(content);
        }
    }
});

server.listen(port, () => { });
