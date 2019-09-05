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

const httpsFilesDir = "/etc/letsencrypt/live/hamitzor.com/"
const key = fs.readFileSync(httpsFilesDir + "privkey.pem", "utf8")
const cert = fs.readFileSync(httpsFilesDir + "cert.pem", "utf8")
const ca = fs.readFileSync(httpsFilesDir + "chain.pem", "utf8")

const redirectApp = express()
redirectApp.all("*", (req, res) => {
  res.writeHead(301, { "Location": "https://" + req.headers.host + req.url })
  res.end()
})

const httpServer = http.createServer(redirectApp)
const httpsServer = https.createServer({ key, cert, ca }, app)

httpServer.listen(80, () => console.log("HTTP Server listens port 80"))
httpsServer.listen(443, () => console.log("HTTPS Server listens port 443"))
