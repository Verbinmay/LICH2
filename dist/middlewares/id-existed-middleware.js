"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idExistedMiddleware = void 0;
const idExistedMiddleware = (req, res, next) => {
    if (req.headers["authorization"] !== "Basic YWRtaW46cXdlcnR5") {
        res.send(401);
    }
    else {
        next();
    }
};
exports.idExistedMiddleware = idExistedMiddleware;
