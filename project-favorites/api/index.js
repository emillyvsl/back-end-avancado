// const http = require('http');
// const data = require('./urls.json');
// const URL = require('url');
// const fs = require('fs');
// const path = require('path');

// function writeFile(cb) {
//   fs.writeFile(
//     path.join(__dirname, 'urls.json'),
//     JSON.stringify(data, null, 2),
//     err => {
//       if (err) throw err;
//       cb('Operação realizada com sucesso');
//     }
//   );
// }


// http.createServer((req, res) => {
//   const { name, url, del,update } = URL.parse(req.url, true).query;
//   res.setHeader('Access-Control-Allow-Origin', '*'); // Adiciona o cabeçalho CORS
//   if (!name || !url) {
//     return res.end(JSON.stringify(data));
//   }
//   if(update) {
//     // Atualiza uma URL existente com base nos parâmetros fornecidos
//     const index = data.urls.findIndex(item => item.url === update);
//     if (index !== -1) {
//       if (name) {
//         data.urls[index].name = name;
//       }
//       if (url) {
//         data.urls[index].url = url;
//       }
//       writeFile(message => {
//         res.end(message);
//       });
//     } else {
//       res.end('URL não encontrada');
//     }
//   }
//    else if (del) {
//     data.urls = data.urls.filter(item => item.url !== url);
//     writeFile(message => {
//       res.end(message);
//     });
//   } else {
    
//     data.urls.push({ name, url });
//     writeFile(message => {
//       res.end(message);
//     });
//   }
// }).listen(3000, () => console.log('Rodando...'));


const express = require('express');
const app = express()//iniciando 
const mongose = require('mongoose')

//forma de ler o json//middlewares
app.use(
    express.urlencoded({
        extended:true
    })
)
app.use(express.json())

//acesso inicial/edpoint
app.get('/',(req,res)=>{
    //mostrar requisiçao
    res.json({message:'oi express'})

}) 

const user = 'emillyvitiria1821'
const senha = encodeURIComponent('Emilly1821.')

mongose.connect(
  `mongodb+srv://${user}:${senha}@api.wmlkw.mongodb.net/?retryWrites=true&w=majority`
)
.then(
  ()=>{
    console.log('servindo')
    app.listen(3000)
  }
)
.catch(
  (err)=>{
    console.log(err)
  }
)
//porta

//mongodb+srv://emillyvitoria1821:<password>@api.wmlkw.mongodb.net/?retryWrites=true&w=majoritymongodb+srv://emillyvitoria1821:<password>@api.wmlkw.mongodb.net/?retryWrites=true&w=majority

