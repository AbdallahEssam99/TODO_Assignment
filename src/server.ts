import express from 'express'
import sequelize from './config/database';
import userRouter from './routes/api/v1/userRoute';
import todoRouter from './routes/api/v1/todoRoute';


const app:express.Application = express();

app.use(express.json());
const port = 3000;
const address = `http://localhost:${port}`;



app.use('/api/v1/todos',todoRouter);
app.use('/api/v1/users',userRouter);

app.get('/', (req, res) => {
    res.send('Welcome to the API!' );
  });

  app.get('*', (req, res) => {
    res.status(404).send('Error 404: Page Not Found');
  });

  app.listen(port, async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        console.log(`Server is running and connected to the database on ${address}`);
    } catch (error) {
        console.error('Unable to start the server:', error);
    }
});