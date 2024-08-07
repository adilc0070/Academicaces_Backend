import { Response } from "express";
const setCookie = (res: Response, name: string, token: string) => {    
    res.cookie(name, token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        expires: new Date(Date.now() + 60 * 60 * 1000),
        domain:'localhost:3000'
    });
}
const deleteCookie = (res: Response, name: string) => {
    res.cookie(name, '', {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        expires: new Date(Date.now()),
    });
}

export {
    setCookie,
    deleteCookie
}