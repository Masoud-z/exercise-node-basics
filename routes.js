const fs = require("fs");

const routesHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  console.log(url);
  res.setHeader("Content-Type", "text/html");
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Send</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
      console.log(body.length, ": ");
      console.log(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  res.write("<html>");
  res.write("<head><title>My First page</title></head>");
  res.write(
    "<body><h1>This is my first page rendered on the server!</h1></body>"
  );
  res.write("</html>");
  res.end();
};

module.exports = routesHandler;
