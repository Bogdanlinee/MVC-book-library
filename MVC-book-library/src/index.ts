import express, {Request, Response} from 'express';

const app = express();
const port = 3000;

app.use(express.static('public/book-page'));
app.use(express.static('public/books-page'));


// /api/v1/?offset=N
// /api/v1/books/{book_id}
// /admin/api/v1/.
app.get('*', async (req: Request, res: Response) => {
        res.json({lol: 'lol'});
    }
)

app.listen(port, () => {
    console.log('server is running');
})