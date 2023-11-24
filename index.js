const express = require("express");
const jwt = require("jsonwebtoken");
const port = 3000;
const KEY = "logginSuccess";

const app = express();
const categories = require("./emercado-api-main/cats/cat.json");

app.use(express.json());

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


app.post("/login", (req, res) => {
  const {user, password} = req.body;   
  if(user == "userVerified" && password == "passwordVerified") {
    const token = jwt.sign({user}, KEY);
    res.status(200).json({token});
  } else {
    res.status(401).json({messagge: "Usuario y/o contraseña incorrecta"});
  };
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });