const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const PORT = process.env.PORT ?? 4000;

app.use(express.json());
app.use(cors());
app.use('/api', require('./routes/index'));

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
