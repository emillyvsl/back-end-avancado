const http = require('http');
const data = require('./urls.json');
const URL = require('url');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
  function writeFile(cb) {
    fs.writeFile(
      path.join(__dirname, 'urls.json'),
      JSON.stringify(data, null, 2),
      err => {
        if (err) throw err;
        cb('Operação realizada com sucesso');
      }
    );
  }

  const { name, url, del } = URL.parse(req.url, true).query;
  if (!name || !url) {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Adiciona o cabeçalho CORS
    return res.end(JSON.stringify(data));
  }

  if (del) {
    data.urls = data.urls.filter(item => item.url !== url);
    writeFile(message => {
      res.setHeader('Access-Control-Allow-Origin', '*'); // Adiciona o cabeçalho CORS
      res.end(message);
    });
  } else {
    data.urls.push({ name, url });
    writeFile(message => {
      res.setHeader('Access-Control-Allow-Origin', '*'); // Adiciona o cabeçalho CORS
      res.end(message);
    });
  }
}).listen(3000, () => console.log('Rodando...'));
