// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/generateCertificate', (req, res) => {
    const { name, date, reason } = req.body;
    const certificateContent = `
        <h2>Leaving Certificate</h2>
        <p>This is to certify that ${name} has left the institution on ${date} due to ${reason}.</p>
    `;
    fs.writeFile('public/certificate.html', certificateContent, (err) => {
        if (err) throw err;
        console.log('Certificate generated successfully!');
        res.download('public/certificate.html');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
