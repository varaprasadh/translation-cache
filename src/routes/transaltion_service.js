const Router = require('express').Router();
const translate = require("../libs/translation-service");


Router.get("/internal/translate", async (req, res) => {
    const { text = "", from = "en", to = "en" } = req.query;
    const response = await translate(text, from, to);
    res.json({
        response
    });
})

module.exports=Router;
