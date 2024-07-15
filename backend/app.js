import "./config/loadEnv.js";
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';

import collectionRoutes from './routes/collection.js';
import taskRoutes from './routes/task.js';
import sequelize from './config/db.js';


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/collections', collectionRoutes);
app.use('/api/collections/:col_id/tasks', taskRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to Task Manager API');
}
);

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});


