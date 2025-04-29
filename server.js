const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { spawn } = require('child_process');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Replace 'YOUR_FRONTEND_URL' with the actual URL where your frontend is hosted
const allowedOrigins = ['https://exampleofty.netlify.app'];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

let currentConfig = {};

app.post('/api/configure', (req, res) => {
    const { sessionId, mongodbUrl } = req.body;
    if (sessionId && mongodbUrl) {
        currentConfig = { sessionId, mongodbUrl };
        console.log('Configuration received and stored:', currentConfig);
        res.status(200).json({ message: 'Configuration received successfully.' });
    } else {
        res.status(400).json({ error: 'Missing sessionId or mongodbUrl in the request body.' });
    }
});

app.post('/api/deploy', (req, res) => {
    if (!currentConfig.sessionId || !currentConfig.mongodbUrl) {
        return res.status(400).json({ error: 'Configuration not yet provided.' });
    }

    res.json({ message: 'Deployment initiated (simulated). Check server logs for details.' });

    console.log('Simulating: npm install in ./bot');
    const installProcess = spawn('npm', ['install'], { cwd: './bot' });

    installProcess.stdout.on('data', (data) => {
        console.log(`npm install (bot) stdout: ${data}`);
    });

    installProcess.stderr.on('data', (data) => {
        console.error(`npm install (bot) stderr: ${data}`);
    });

    installProcess.on('close', (code) => {
        if (code === 0) {
            console.log('npm install (bot) finished.');
            console.log('Simulating: npm start in ./bot');
            const startProcess = spawn('npm', ['start'], {
                cwd: './bot',
                env: { ...process.env, SESSION_ID: currentConfig.sessionId, MONGODB: currentConfig.mongodbUrl },
                detached: true,
                stdio: 'ignore'
            }).unref();
            console.log('npm start (bot) initiated in the background.');
        } else {
            console.error(`npm install (bot) failed with code ${code}`);
        }
    });
});

app.get('/', (req, res) => {
    res.send('Backend server for LLW Bot deployment is running!');
});

app.listen(port, () => {
    console.log(`Backend server listening on port ${port}`);
});
