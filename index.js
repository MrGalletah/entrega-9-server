const express = require("express");

const port = 3000;

const app = express();




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

app.get("/products/:index", (req,res)=>{
    const products = require(`./emercado-api-main/cats_products/${req.params.index}.json`);
    res.json(products)
});

app.get("/products-info/:index", (req,res)=>{
    const productsComments = require(`./emercado-api-main/products/${req.params.index}.json`);
    res.json(productsComments)
});

app.get("/products-comments/:index", (req,res)=>{
    const productsComments = require(`./emercado-api-main/products_comments/${req.params.index}.json`);
    res.json(productsComments)
});

app.get("/buy",(req,res)=>{
    const publish = require("./emercado-api-main/cart/buy.json");
    res.json(publish)
});
app.get("/usercart",(req,res)=>{
    const publish = require("./emercado-api-main/user_cart/25801.json");
    res.json(publish)
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
