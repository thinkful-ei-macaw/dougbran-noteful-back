require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const FoldersService = require("./folders/folders-service");

const app = express();
const jsonParser = express.json();

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.get("/folders", (req, res, next) => {
  const knexInstance = req.app.get("db");
  FoldersService.getAllFolders(knexInstance)
    .then((folders) => {
      res.json(folders);
    })
    .catch(next);
});

app.get("/folders/:folder_id", (req, res, next) => {
  FoldersService.getById(
    req.app.get('db'),
    req.params.folder_id
  )
    .then(folder => {
      if (!folder) {
        return res.status(404).json({
          error: { message: "Folder doesn't exist" }
        })
      }
      res.json(folder)
    })
})

app.post("/folders", jsonParser, (req, res, next) => {
  const { name } = req.body
  const newFolder = { name }

  if(newFolder.name == null)
    return res.status(400).json({
      error: { message: 'Missing name in request body'}
    })

  FoldersService.insertFolder(
    req.app.get('db'),
    newFolder
  )
    .then(folder => {
      res.status(201).location(`/folders/${folder.id}`).json(folder)
    })
    .catch(next)
})

app.use(function errorHandler(error, req, res, next) {
  let response;
  console.log(error.message);
  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
