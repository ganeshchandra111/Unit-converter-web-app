import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import {
  mm,
  cm,
  m,
  km,
  ft,
  inch,
  mile,
  yard,
  mg,
  g,
  kg,
  ounce,
  pound,
} from "./converstion.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index", {
    message: `${req.query.message ? req.query.message : ""}`,
  });
});

app.get("/length", (req, res) => {
  let result = null;

  let { fromUnit, toUnit, value } = req.query;

  if (!fromUnit || !toUnit || value === undefined) {
    return res.render("length", {
      message: "",
    });
  }

  const units = { mm, cm, m, km, ft, inch, mile, yard };
  const fromTable = units[fromUnit];
  const toUnits = fromTable[toUnit];
  result = Number(value) * toUnits;

  res.render("length", { message: `${value}${fromUnit} = ${result ? result : ""} ${toUnit}` });
});

app.get("/weight",(req,res)=>{
    let result = null;

  let { fromUnit, toUnit, value } = req.query;

  if (!fromUnit || !toUnit || value === undefined) {
    return res.render("weight", {
      message: "",
    });
  }

  const units = { mg,g,kg,ounce,pound };
  const fromTable = units[fromUnit];
  const toUnits = fromTable[toUnit];
  result = Number(value) * toUnits;

  res.render("weight", { message: `${value}${fromUnit} = ${result ? result : ""} ${toUnit}` });
})

const port = 5000;
const server = app.listen(port, () => {
  console.log("Server is running . . . . ");
  console.log(`http://localhost:${port}/`);
});
