var express = require('express');

app = express();

// Change the proxy settings to allow the IP to be accessed
app.set('trust proxy')

// Mount the middleware to serve the styles sheet in the public folder
app.use("/public", express.static(__dirname + "/public"));

// Display the index page for GET requests to the root path
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.get('/whoami', (req, res) => {
    //res.send({"header": req.headers});
    res.send({
        "ipaddress": req.headers['x-forwarded-for'],
        "language": req.headers["accept-language"],
        "software": req.headers["user-agent"]
    });
});

// Get the port or assign it to 3000 if there is none 
var port = process.env.PORT || 3000;

//server.listen(port, "::1");

app.listen(port, () => console.log(`Node is listening on port ${port}...`));