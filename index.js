const express  = require('express');
const cors = require('cors');
const app = express();

const router = require('./routes/jwtAuth.js');

// Middleware
app.use(express.json());
app.use(cors());

// routes
app.use('/auth', router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));