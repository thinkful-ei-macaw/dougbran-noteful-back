require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
// const FoldersService = require("./folders/folders-service");
// const notesService = require("./notes/notes-service");
const app = express();
const jsonParser = express.json();
const foldersRouter = require("./folders/folders-router");
const notesRouter = require("./notes/notes-router");

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.use("/api/folders", foldersRouter);
app.use("/api/notes", notesRouter);

module.exports = app;
