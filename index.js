const express = require("express");

const port = 3000;

const app = express();
const categories = require("./emercado-api-main/cats/cat.json")


app.get("/", (req, res) => {
       res.send("<h1>Bienvenid@ al servidor</h1>");
  });

  app.get("/categories", (req,res)=>{

  res.json(categories);
  });



app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });