import express from "express";
import cors from 'cors';
import listCollections from "./controllers/get-collections-data.js";
import mongoose from 'mongoose';
import  generateSchema  from "./controllers/generate-schema.js";
import {
  createSchema,
  getSchemas,
  getSchemaByProjectId,
  updateSchema,
  deleteSchema,
} from './controllers/collection-schemas.js';

const app = express();
app.use(cors());
const port = 3000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🟢 MongoDB conectado'))
  .catch(err => console.error('🔴 Error al conectar MongoDB', err));

// I'll use JSON to process data
app.use(express.json());

app.get("/", (req, res) => {
  console.log(req);
  res.send("Hello World!");
});
app.get("/firestore/collections", listCollections);
app.post("/firestore/schemas", generateSchema);



app.post('/schemas/', createSchema);
app.get('/schemas/', getSchemas);
app.get('/schemas/:id', getSchemaByProjectId);
app.put('/schemas/:id', updateSchema);
app.delete('/schemas/:id', deleteSchema);

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
