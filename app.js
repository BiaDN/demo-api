
require('dotenv/config')
const connectDB = require('./db/connect')
const express = require('express');
const app = express();

app.use(express.json());

const events = require('./routes/events')
const port = process.env.PORT || 3006

// app.use(notFound)

app.use('/api/v2/events', events);


const start = async () => {
    try {
        await connectDB(process.env.URL_DB);
        app.listen(port, console.log(`Listen in port ${port}`));

    } catch (error) {
        console.log(`Error: ${error}`)
    }
}

console.log(process.env.URL_DB);

start();
