const express = require("express");

const port = 3000;

const app = express();
const categories = require("./emercado-api-main/cats/cat.json")

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
   });


app.get("/", (req, res) => {
       res.send("<h1>Bienvenid@ al servidor</h1>");
  });

  app.get("/categories", (req,res)=>{

  res.json(categories);
  });



app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });