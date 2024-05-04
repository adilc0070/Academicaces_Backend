"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var app = (0, express_1.default)();
app.listen(3000, function () { return console.log("Listening on port 3000"); });
exports.default = app;
