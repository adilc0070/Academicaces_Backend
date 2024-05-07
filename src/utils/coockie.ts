import { Response } from "express";
const setCookie = (res: Response, name: string, token: string) => {
    res.cookie(name, token, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        expires: new Date(Date.now() + 60 * 60 * 1000),
    });
}

export {
    setCookie
}