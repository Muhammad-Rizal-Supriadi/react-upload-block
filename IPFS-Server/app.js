const express = require('express');
const app = express();
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Menggunakan endpoint default dari IPFS Desktop
const ipfsAPI = require('ipfs-api');
const ipfs = ipfsAPI({ host: 'localhost', port: '5001', protocol: 'http' });

app.get('/', function (req, res) {
  res.sendFile(__dirname + '../src/public/IPFS');
});

app.post('/document', upload.array('avatar', 2), function (req, res, next) {
  console.log(req.files);
  const files = req.files;
  const hashes = [];
  files.forEach(function(file) {
    var data = Buffer.from(fs.readFileSync(file.path));
    ipfs.add(data, function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).send('Internal server error');
        return;
      }
      console.log(result);
      hashes.push(result[0].hash);
      if (hashes.length == files.length) {
        res.json({ hashes: hashes }); // send hashes as JSON response
      }
    });
  });
});

app.get('/download/:ID', function (req, res) {
  console.log(req.params.ID);
  res.redirect('https://ipfs.io/ipfs/' + req.params.ID);
});

app.listen(3100);
