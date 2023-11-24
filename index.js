const express = require("express");
const jwt = require("jsonwebtoken");
const mariadb = require('mariadb');
const port = 3000;
const KEY = "logginSuccess";

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    console.error('Sin token de acceso');
    return res.status(401).json({ message: "Sin token de acceso" });
  }

  jwt.verify(token, KEY, (err, user) => {
    if (err) {
      console.error('Token de acceso incorrecto:', err);
      return res.status(403).json({ message: "Token de acceso incorrecto" });
    }
    req.user = user;
    next();
  });
};
const app = express();
const categories = require("./emercado-api-main/cats/cat.json");

app.use(express.json());


const pool = mariadb.createPool({host: "localhost", user: "root",password: "1234",database: "prueba", connectionLimit: 5});

app.post("/cart", authenticateToken, async (req, res) => {
  try {
    const { products } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No hay productos para agregar al carrito" });
    }

    for (const product of products) {
      const { id, name, description, cost, currency, soldCount, category } = product;

      const insertQuery = `
        INSERT INTO cart (id, name, description, cost, currency, soldCount, category)
        VALUES (?, ?, ?, ?, ?, ?, ?);
      `;

      await pool.query(insertQuery, [id, name, description, cost, currency, soldCount, category]);
    }

    res.status(200).json({ message: "Productos agregados al carrito con éxito" });
  } catch (error) {
    console.error('Error al agregar productos al carrito:', error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});


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

app.get("/publish", (req, res) => {
  const publish = require("./emercado-api-main/sell/publish.json");
  res.json(publish);
});

app.post("/login", (req, res) => {
  const { user, password } = req.body;
  if (user == "userVerified" && password == "passwordVerified") {
    const token = jwt.sign({ user }, KEY);
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: "Usuario y/o contraseña incorrecta" });
  }
});

app.get("/products/:index", (req, res) => {
  const products = require(`./emercado-api-main/cats_products/${req.params.index}.json`);
  res.json(products);
});

app.get("/products-info/:index", (req, res) => {
  const productsInfo = require(`./emercado-api-main/products/${req.params.index}.json`);
  res.json(productsInfo);
});

app.get("/products-comments/:index", (req, res) => {
  const productsComments = require(`./emercado-api-main/products_comments/${req.params.index}.json`);
  res.json(productsComments);
});

app.get("/cart", authenticateToken, (req, res) => {
  const cart = require("./emercado-api-main/cart/buy.json");
  res.json(cart);
});

app.get("/usercart", authenticateToken, (req, res) => {
  const userCart = require("./emercado-api-main/user_cart/25801.json");
  res.json(userCart);
});


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
