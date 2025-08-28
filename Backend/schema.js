const joi = require("joi");

const listingSchema = joi.object({
    listing: joi.object({
        title: joi.string().required(),
        description: joi.string().allow(''),
        image: joi.string().uri().allow(''),
        price: joi.number().min(0).required(),
        location: joi.string().allow(''),
        country: joi.string().allow(''),
    }).required()
});
module.exports = listingSchema;

