import express from 'express';
import router from './routes.js';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(port, () => {
    console.log(`Сервер работает на порту ${port}`);
})