import {Request, Response} from 'express';
import {getStatsQueries, increasePageViews, increasePageClicks} from '../db/dbQueries';
import {handleQueryResponse} from '../utils/bookQueriesUtil';

const changeConversion = async (req: Request, res: Response) => {
    const {id} = req.params;

    if (!id && !isNaN(parseInt(id))) {
        return res.status(400).json({error: 'Provide Book id',});
    }

    const bookId = parseInt(id);

    try {
        const bookStatistic = (await handleQueryResponse(getStatsQueries, bookId))[0];

        if (!bookStatistic) {
            return res.status(400).json({error: 'Provide Book id'});
        }

        const viewsValue = bookStatistic.views + 1;
        await handleQueryResponse(increasePageViews, bookId, viewsValue);

        res.status(200).json({success: 'true'});
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

const getConversion = async (req: Request, res: Response) => {
    const {id} = req.params;

    if (!id && !isNaN(parseInt(id))) {
        return res.status(400).json({error: 'Provide Book id',});
    }

    const bookId = parseInt(id);

    try {
        const bookStatistic = (await handleQueryResponse(getStatsQueries, bookId))[0];

        if (!bookStatistic) {
            return res.status(400).json({error: 'Provide Book id'});
        }

        const clicksValue = bookStatistic.clicks + 1;
        await handleQueryResponse(increasePageClicks, bookId, clicksValue);

        res.status(200).json({success: 'true'});
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

export {
    changeConversion,
    getConversion,
}