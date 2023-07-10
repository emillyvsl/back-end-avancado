const http = require('http');
const data = require('./urls.json');
const URL = require('url');
const fs = require('fs');
const path = require('path');

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


http.createServer((req, res) => {
  const { name, url, del,update } = URL.parse(req.url, true).query;
  res.setHeader('Access-Control-Allow-Origin', '*'); // Adiciona o cabeçalho CORS
  if (!name || !url) {
    return res.end(JSON.stringify(data));
  }
  if(update) {
    // Atualiza uma URL existente com base nos parâmetros fornecidos
    const index = data.urls.findIndex(item => item.url === update);
    if (index !== -1) {
      if (name) {
        data.urls[index].name = name;
      }
      if (url) {
        data.urls[index].url = url;
      }
      writeFile(message => {
        res.end(message);
      });
    } else {
      res.end('URL não encontrada');
    }
  }
   else if (del) {
    data.urls = data.urls.filter(item => item.url !== url);
    writeFile(message => {
      res.end(message);
    });
  } else {
    
    data.urls.push({ name, url });
    writeFile(message => {
      res.end(message);
    });
  }
}).listen(3000, () => console.log('Rodando...'));
