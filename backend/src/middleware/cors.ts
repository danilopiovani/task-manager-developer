import { Request, Response, NextFunction } from 'express';
const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS?.split(',') : ['http://localhost:3000', 'http://localhost:3001'];
const cors = (req: Request, res: Response, next: NextFunction): void => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin as string)) {
        res.setHeader('Access-Control-Allow-Origin', origin as string);
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        if (req.method === 'OPTIONS') {
            res.sendStatus(200);
        } else {
            next();
        }
    } else {
        res.sendStatus(403);
    }
};
export default cors;