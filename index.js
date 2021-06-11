const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");
require('dotenv').config();

const API_SERVICE_URL = process.env.API_SERVICE_URL;
const REACT_SERVICE_URL = process.env.REACT_SERVICE_URL;

const app = express();

app.use(cors({
  origin: "localhost:3000"
}));
app.use(morgan("dev"));

app.use("/hermes/*", createProxyMiddleware({
  target: API_SERVICE_URL,
  changeOrigin: true,
}));

app.use(
  "/api/*",
  createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
  }),
);

app.use(
  "/catalog/*",
  createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
  }),
);

app.get("/mocks/:file", (req, res) => {
  try {
    const data = require(`./mocks/${req.params.file}.json`);
    res.json(data);
  } catch (e) {
    res.status(404).json({
      message: 'URL not found'
    });
  }
});

app.use("/", createProxyMiddleware({
  target: REACT_SERVICE_URL,
  ws: true,
  changeOrigin: true,
}));

app.listen(4080);
