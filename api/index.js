import express from "express";
import cors from 'cors';
import listCollections from "./controllers/get-collections-data.js";
import  generateSchema  from "./controllers/generate-schema.js";
const app = express();
app.use(cors());
const port = 3000;

// I'll use JSON to process data
app.use(express.json());

app.get("/", (req, res) => {
  console.log(req);
  res.send("Hello World!");
});
app.get("/firestore/collections", listCollections);
app.post("/firestore/schemas", generateSchema);

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
