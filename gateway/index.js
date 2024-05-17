const express  = require("express");
const {createProxyMiddleware} = require('http-proxy-middleware')
const app = express()

app.use('/user',
    createProxyMiddleware({
        target: "http://localhost:3001",
        pathRewrite: {
            "^/user": ""
        }
    })
)

app.use('/client',
    createProxyMiddleware({
        target: "http://localhost:3002",
        pathRewrite: {
            "^/client": ""
        }
    })
)

app.use('/location',
    createProxyMiddleware({
        target: "http://localhost:3004",
        pathRewrite: {
            "^/location": ""
        }
    })
)

app.use('/voiture',
    createProxyMiddleware({
        target: "http://localhost:3003",
        pathRewrite: {
            "^/voiture": ""
        }
    })
)

app.listen(3000,()=>{
    console.log ("mandeha gateway")
})