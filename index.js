const express = require("express")
const path = require("path")
const http = require("http")
const https = require("https")
const fs = require("fs")
const app = express()

app.enable("trust proxy")

app.get("*", function (req, res, next) {
  res.sendFile(path.resolve(__dirname, "public", "index.html"))
})

app.use(express.static(path.resolve(__dirname, "public")))

module.exports = app;
