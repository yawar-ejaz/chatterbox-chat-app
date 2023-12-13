require('dotenv').config();
const express = require(`express`);
const { chats } = require(`./data/data`);
const sequelize = require(`./utils/database`);
const userRoutes = require(`./routes/userRoutes`);
const User = require(`./models/users`);
const { notFound, errorHandler } = require(`./middlewares/error`);


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.get(`/`, (req, res) => {
    res.send("Root file");
});
app.use(`/api/user`, userRoutes);

app.use(notFound);
app.use(errorHandler);


const startServer = async () => {
    try {
        // await sequelize.sync({force: true});
        await sequelize.sync();
        app.listen(port, () => {
            console.log(`Server running on port ${port}...`);
        });
    } catch (error) {
        console.log("Unable to start server");
        console.log(error);
    }
};

startServer();