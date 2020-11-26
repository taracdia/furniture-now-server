const express = require("express");
const furnitureTypeRouter = express.Router();

furnitureTypeRouter.route("/")
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
})
.get((req, res) => {
    res.end("Will send all furnitures to you");
})
.post((req, res) => {
    res.end(`Will add furniture: ${req.body.name}`)
})
.put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operations not supported on /furnitureTypes");
})
.delete((req, res) => {
    res.end("Deleting all furnitures");
});

module.exports = furnitureTypeRouter;