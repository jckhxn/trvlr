const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 1337;
const logs = require('./api/logs')
const middlewares = require('./middlewares');

require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(morgan('common'));
app.use(helmet());
app.use(cors())
// app.use(cors({
//     origin:process.env.CORS_ORIGIN,
// }));
app.use(express.json());

 app.get('/',(req, res,next) => {
     res.json({
         message:"Hello World!",
     })
 })

 
 app.use('/api/logs',logs);

 app.use(middlewares.notFound);
 app.use(middlewares.errorHandler);


app.listen(port, () => {
    console.log(`Listening  at ${port}`);

});

