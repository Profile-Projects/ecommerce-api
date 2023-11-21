const express = require("express");


const app = express();
const PORT = 3000;

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