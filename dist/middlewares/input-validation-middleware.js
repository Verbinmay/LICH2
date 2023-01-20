"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputValidationMiddleware = void 0;
const express_validator_1 = require("express-validator");
const inputValidationMiddleware = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        let newErorsArray = errors.array().map(function (a) {
            return {
                message: a.msg,
                field: a.param,
            };
        });
        res.status(400).json({ errorsMessages: newErorsArray });
    }
    else {
        next();
    }
};
exports.inputValidationMiddleware = inputValidationMiddleware;
