const express = require("express");
const FurnitureType = require("../models/campsite");

const furnitureTypeRouter = express.Router();

furnitureTypeRouter.route("/")
// .all((req, res, next) => {
    // res.statusCode = 200;
    // res.setHeader("Content-Type", "application/json");
//     next();
// })
.get((req, res, next) => {
    FurnitureType.find()
    .then(campsites => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(campsites);
    })
    .catch(err => next(err));
})
.post((req, res, next) => {
    FurnitureType.create(req.body)
    .then(furnitureType => {
        console.log("Campsite Created ", furnitureType);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(furnitureType);
    })
    .catch(e => next(e));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operations not supported on /furnitureTypes");
})
.delete((req, res, next) => {
    FurnitureType.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
    })
    .catch(e => next(e));
});

furnitureTypeRouter.route("/:furnitureTypeId")
.get((req, res, next) => {
    FurnitureType.findById(req.params.furnitureTypeId)
    .then(furnitureType => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(furnitureType);
    })
    .catch(e => next(e));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /furnitureTypes/${req.params.furnitureTypeId}`);
})
.put((req, res, next) => {
    FurnitureType.findByIdAndUpdate(req.params.furnitureTypeId, {
        $set: req.body
    }, {new: true})
    .then(furnitureType => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(furnitureType);
    })
    .catch(e => next(e));
})
.delete((req, res, next) => {
    FurnitureType.findByIdAndDelete(req.params.furnitureTypeId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
    })
    .catch(e => next(e));
});

module.exports = furnitureTypeRouter;