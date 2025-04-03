const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

const url = 'https://www.menucraftqr.com/menu/moti';

// Ensure the public directory exists
const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
}

// Generate QR code
QRCode.toFile(
    path.join(publicDir, 'qr-code-sample.png'),
    url,
    {
        color: {
            dark: '#000000',
            light: '#ffffff'
        },
        width: 512,
        margin: 1,
        errorCorrectionLevel: 'H'
    },
    function (err) {
        if (err) throw err;
        console.log('QR code has been generated successfully!');
    }
); 