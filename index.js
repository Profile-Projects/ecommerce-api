const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Controllers
const CustomerController = require("./controller/CustomerController");
const PartnerConroller = require("./controller/PartnerController");
const ProductController = require("./controller/ProductController");
const ShoppingCartController = require("./controller/ShoppingCartController");


const app = express();
const PORT = 3000;

const VERSION = `v1`;
const SERVICE_PATH = `ecom/api`


const corsOptions = {
    origin: '*', // This allows requests from any origin.
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // This allows the specified methods.
    headers: ['Content-Type', 'Authorization', 'account_sid', 'account_token'], // This allows the specified headers.
};

const errorHandler = (err, req, res, next) => {
    console.log(err);
    res.status(500).json({message: 'Internal Server Error', error: err?.message || ""});
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors(corsOptions));

app.use(`/${SERVICE_PATH}/${VERSION}/customer`, CustomerController);
app.use(`/${SERVICE_PATH}/${VERSION}/partner`, PartnerConroller);
app.use(`/${SERVICE_PATH}/${VERSION}/product`, ProductController);
app.use(`/${SERVICE_PATH}/${VERSION}/shopping_cart`, ShoppingCartController);


app.get(`/test`, (req, res) => {
    return res.status(200).json({ message: "E-commerce website is up and running!"})
})

app.listen(PORT, (err) => {
    if (!err) {
        console.log(`e-commerce api running on localhost:${PORT}`);
    } else {
        console.error(`shutting down as booting failed!`);
    }
})