const express = require("express");
const FurnitureType = require("../models/furnitureType");
const authenticate = require("../authenticate");
const cors = require("./cors");

const furnitureTypeRouter = express.Router();

furnitureTypeRouter
	.route("/")
	// .all((req, res, next) => {
	// res.statusCode = 200;
	// res.setHeader("Content-Type", "application/json");
	//     next();
	// })
	.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
	.get(cors.cors, (req, res, next) => {
		FurnitureType.find()
			.then(campsites => {
				res.statusCode = 200;
				res.setHeader("Content-Type", "application/json");
				res.json(campsites);
			})
			.catch(err => next(err));
	})
	.post(
		cors.corsWithOptions,
		authenticate.verifyUser,
		authenticate.verifyAdmin,
		(req, res, next) => {
			FurnitureType.create(req.body)
				.then(furnitureType => {
					console.log("Campsite Created ", furnitureType);
					res.statusCode = 200;
					res.setHeader("Content-Type", "application/json");
					res.json(furnitureType);
				})
				.catch(e => next(e));
		}
	)
	.put((req, res) => {
		res.statusCode = 403;
		res.end("PUT operations not supported on /furnitureTypes");
	})
	.delete(
		cors.corsWithOptions,
		authenticate.verifyUser,
		authenticate.verifyAdmin,
		(req, res, next) => {
			FurnitureType.deleteMany()
				.then(response => {
					res.statusCode = 200;
					res.setHeader("Content-Type", "application/json");
					res.json(response);
				})
				.catch(e => next(e));
		}
	);

furnitureTypeRouter
	.route("/:furnitureTypeId")
	.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
	.get(cors.cors, (req, res, next) => {
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
		res.end(
			`POST operation not supported on /furnitureTypes/${req.params.furnitureTypeId}`
		);
	})
	.put(
		cors.corsWithOptions,
		authenticate.verifyUser,
		authenticate.verifyAdmin,
		(req, res, next) => {
			FurnitureType.findByIdAndUpdate(
				req.params.furnitureTypeId,
				{
					$set: req.body,
				},
				{ new: true }
			)
				.then(furnitureType => {
					res.statusCode = 200;
					res.setHeader("Content-Type", "application/json");
					res.json(furnitureType);
				})
				.catch(e => next(e));
		}
	)
	.delete(
		cors.corsWithOptions,
		authenticate.verifyUser,
		authenticate.verifyAdmin,
		(req, res, next) => {
			FurnitureType.findByIdAndDelete(req.params.furnitureTypeId)
				.then(response => {
					res.statusCode = 200;
					res.setHeader("Content-Type", "application/json");
					res.json(response);
				})
				.catch(e => next(e));
		}
	);

furnitureTypeRouter
	.route("/:furnitureTypeId/furnitures")
	.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
	.get(cors.cors, (req, res, next) => {
		FurnitureType.findById(req.params.furnitureTypeId)
			.then(furnitureType => {
				if (furnitureType) {
					res.statusCode = 200;
					res.setHeader("Content-Type", "application/json");
					res.json(furnitureType.furnitures);
				} else {
					const err = new Error(
						`FurnitureType ${req.params.furnitureTypeId} not found`
					);
					err.status = 404;
					return next(err);
				}
			})
			.catch(e => next(e));
	})
	.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
		FurnitureType.findById(req.params.furnitureTypeId)
			.then(furnitureType => {
				if (furnitureType) {
					furnitureType.furnitures.push(req.body);
					furnitureType
						.save()
						.then(furnitureType => {
							res.statusCode = 200;
							res.setHeader("Content-Type", "application/json");
							res.json(furnitureType);
						})
						.catch(e => next(e));
				} else {
					const err = new Error(
						`FurnitureType ${req.params.furnitureTypeId} not found`
					);
					err.status = 404;
					return next(err);
				}
			})
			.catch(e => next(e));
	})
	.put((req, res) => {
		res.statusCode = 403;
		res.end(
			`PUT operation not supported on /furnitureType/${req.params.furnitureTypeId}/furnitures`
		);
	})
	.delete(
		cors.corsWithOptions,
		authenticate.verifyUser,
		authenticate.verifyAdmin,
		(req, res, next) => {
			FurnitureType.findById(req.params.furnitureTypeId)
				.then(furnitureType => {
					if (furnitureType) {
						for (
							let i = furnitureType.furnitures.length - 1;
							i >= 0;
							i--
						) {
							furnitureType.furnitures
								.id(furnitureType.furnitures[i]._id)
								.remove();
						}
						furnitureType
							.save()
							.then(furnitureType => {
								res.statusCode = 200;
								res.setHeader(
									"Content-Type",
									"application/json"
								);
								res.json(furnitureType);
							})
							.catch(e => next(e));
					} else {
						const err = new Error(
							`FurnitureType ${req.params.furnitureTypeId} not found`
						);
						err.status = 404;
						return next(err);
					}
				})
				.catch(e => next(e));
		}
	);

furnitureTypeRouter
	.route("/:furnitureTypeId/furnitures/:furnitureId")
	.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
	.get(cors.cors, (req, res, next) => {
		FurnitureType.findById(req.params.furnitureTypeId)
			.then(furnitureType => {
				if (
					furnitureType &&
					furnitureType.furnitures.id(req.params.furnitureId)
				) {
					res.statusCode = 200;
					res.setHeader("Content-Type", "application/json");
					res.json(
						furnitureType.furnitures.id(req.params.furnitureId)
					);
				} else if (!furnitureType) {
					const err = new Error(
						`FurnitureType ${req.params.furnitureTypeId} not found`
					);
					err.status = 404;
					return next(err);
				} else {
					const err = new Error(
						`Furniture ${req.params.furnitureId} not found`
					);
					err.status = 404;
					return next(err);
				}
			})
			.catch(e => next(e));
	})
	.post((req, res) => {
		res.statusCode = 403;
		res.end(
			`POST operation not supported on /furnitureType/${req.params.furnitureTypeId}/furnitures/${req.params.furnitureId}`
		);
	})
	.put(authenticate.verifyUser, (req, res, next) => {
		FurnitureType.findById(req.params.furnitureTypeId)
			.then(furnitureType => {
				if (
					furnitureType &&
					furnitureType.furnitures.id(req.params.furnitureId)
				) {
					if (req.body.name) {
						furnitureType.furnitures.id(
							req.params.furnitureId
						).name = req.body.name;
					}
					if (req.body.price) {
						furnitureType.furnitures.id(
							req.params.furnitureId
						).price = req.body.price;
					}
					if (req.body.image) {
						furnitureType.furnitures.id(
							req.params.furnitureId
						).image = req.body.image;
					}
					if (req.body.description) {
						furnitureType.furnitures.id(
							req.params.furnitureId
						).description = req.body.description;
					}
					if (req.body.quantity) {
						furnitureType.furnitures.id(
							req.params.furnitureId
						).quantity = req.body.quantity;
					}
					furnitureType
						.save()
						.then(furnitureType => {
							res.statusCode = 200;
							res.setHeader("Content-Type", "application/json");
							res.json(furnitureType);
						})
						.catch(e => next(e));
				} else if (!furnitureType) {
					const err = new Error(
						`FurnitureType ${req.params.furnitureTypeId} not found`
					);
					err.status = 404;
					return next(err);
				} else {
					const err = new Error(
						`Furniture ${req.params.furnitureId} not found`
					);
					err.status = 404;
					return next(err);
				}
			})
			.catch(e => next(e));
	})
	.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
		FurnitureType.findById(req.params.furnitureTypeId)
			.then(furnitureType => {
				if (
					furnitureType &&
					furnitureType.furnitures.id(req.params.furnitureId)
				) {
					furnitureType.furnitures
						.id(req.params.furnitureId)
						.remove();
					furnitureType
						.save()
						.then(furnitureType => {
							res.statusCode = 200;
							res.setHeader("Content-Type", "application/json");
							res.json(furnitureType);
						})
						.catch(e => next(e));
				} else if (!furnitureType) {
					const err = new Error(
						`FurnitureType ${req.params.furnitureTypeId} not found`
					);
					err.status = 404;
					return next(err);
				} else {
					const err = new Error(
						`Furniture ${req.params.furnitureId} not found`
					);
					err.status = 404;
					return next(err);
				}
			})
			.catch(e => next(e));
	});

module.exports = furnitureTypeRouter;
