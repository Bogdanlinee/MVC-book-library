import {Request, Response} from 'express';

const logout = async (req: Request, res: Response) => {
    res.status(200).json({success: true});
}

export {logout}