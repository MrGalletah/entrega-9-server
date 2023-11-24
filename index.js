const express = require("express");
const jwt = require("jsonwebtoken");
const port = 3000;
const KEY = "logginSuccess";

const app = express();
const categories = require("./emercado-api-main/cats/cat.json");

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("<h1>Bienvenid@ al servidor</h1>");
});

app.get("/categories", (req, res) => {
  const categories = require("./emercado-api-main/cats/cat.json");
  res.json(categories);
});

app.get("/publish",(req,res)=>{
    const publish = require("./emercado-api-main/sell/publish.json");
    res.json(publish)
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

app.get("/products/:index", (req,res)=>{
    const products = require(`./emercado-api-main/cats_products/${req.params.index}.json`);
    res.json(products)
});

app.get("/products-info/:index", (req,res)=>{
    const productsInfo = require(`./emercado-api-main/products/${req.params.index}.json`);
    res.json(productsInfo)
});

app.get("/products-comments/:index", (req,res)=>{
    const productsComments = require(`./emercado-api-main/products_comments/${req.params.index}.json`);
    res.json(productsComments)
});

app.get("/buy",(req,res)=>{
    const buy = require("./emercado-api-main/cart/buy.json");
    res.json(buy)
});
app.get("/usercart",(req,res)=>{
    const userCart = require("./emercado-api-main/user_cart/25801.json");
    res.json(userCart)
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
