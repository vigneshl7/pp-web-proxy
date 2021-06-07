const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");

const API_SERVICE_URL = "https://dev1.purchasingplatform.com/"
const REACT_SERVICE_URL = "http://localhost:3000/"

const app = express();

app.use(cors({
  origin: "localhost:3000"
}));
app.use(morgan("dev"));

app.use("/hermes/*", createProxyMiddleware({
  target: API_SERVICE_URL,
  changeOrigin: true,
}));

app.use("/", createProxyMiddleware({
  target: REACT_SERVICE_URL,
  changeOrigin: true,
}));

app.listen(4080);
