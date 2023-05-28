require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const sequelize = require('./Database/Config');
sequelize.sync({ alter:true }).then(() => {
    console.log("Database synchronizing");
}).catch((err) => {
    console.error(err);
})

const port = process.env.PORT || 8000;

const routerUser = require('./Routes/User');
const routerPresence = require('./Routes/Presence');

app.use(cors());
app.use(express.json());

app.use('/api', routerUser);
app.use('/api', routerPresence);

app.listen(port, () => {
    console.log("Server is running at port "+port);
});