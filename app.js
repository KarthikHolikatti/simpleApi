const express = require('express');
const jwt = require('jsonwebtoken');
const awsServerlessExpress = require('aws-serverless-express');
const cors = require('cors');

const app = express();
const SECRET_KEY = process.env.SECRET_KEY;
app.use(express.json());
app.use(cors())


// Verify JWT
function authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).send('Access Denied! Token Missing!');

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).send('Invalid Token, Generate the new token!');
        req.user = user;
        next();
    });
}

// Public route to generate a token
app.post('/login', (req, res) => {
    const { username } = req.body;
    if (!username) {
        return res.status(400).send('data "username" is required');
    }

    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).send(token);
});

// Protected route
app.get('/hello', authenticateToken, (req, res) => {
    // res.status(200).json({ message: 'Hello, World!' })
    res.status(200).send('Hello, World!')
});

// To run locally
// app.listen(3000, () => {
//     console.log(`Server running on port ${3000}`);
// });

// To deploy on AWS
const server = awsServerlessExpress.createServer(app);
exports.handler = async (event, context) => {
    return awsServerlessExpress.proxy(server, event, context, "PROMISE").promise;
};