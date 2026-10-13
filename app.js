const express = require('express');
const path = require('path');
const client = require('prom-client');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Step 2: Enable default Node.js metrics
client.collectDefaultMetrics();

// Step 3: Create an HTTP request counter
const httpRequestCounter = new client.Counter({
    name: 'task_manager_http_requests_total',
    help: 'Total HTTP requests received'
});

// Step 4: Count HTTP requests using middleware
app.use((req, res, next) => {
    httpRequestCounter.inc();
    next();
});

// Home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Step 5: Create the Prometheus metrics endpoint
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Student Task Manager running on port ${PORT}`);
});