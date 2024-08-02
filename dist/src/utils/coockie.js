"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCookie = exports.setCookie = void 0;
const setCookie = (res, name, token) => {
    res.cookie(name, token, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        expires: new Date(Date.now() + 60 * 60 * 1000),
    });
};
exports.setCookie = setCookie;
const deleteCookie = (res, name) => {
    res.cookie(name, '', {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        expires: new Date(Date.now()),
    });
};
exports.deleteCookie = deleteCookie;
