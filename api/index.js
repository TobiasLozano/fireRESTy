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
import {
  createDoc,
  getDoc,
  updateDoc,
  deleteDoc,getCollectionData
} from "./controllers/crud-collections.js";

const app = express();
app.use(cors());
app.use(express.static('public'));
const port = 3000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🟢 MongoDB conectado'))
  .catch(err => console.error('🔴 Error al conectar MongoDB', err));

// I'll use JSON to process data
app.use(express.json());

/* app.get("/", (req, res) => {
  console.log(req);
  res.send("Hello World!");
}); */




app.post("/api/:collection", createDoc);
app.get("/api/:collection/:id", getDoc);
app.get("/api/:collection", getCollectionData);
app.put("/api/:collection/:id", updateDoc);
app.delete("/api/:collection/:id", deleteDoc);


app.get("/firestore/collections", listCollections);
app.post("/firestore/schemas", generateSchema);



app.post('/schemas/', createSchema);
app.get('/schemas/', getSchemas);
app.get('/schemas/:id', getSchemaByProjectId);
app.put('/schemas/:id', updateSchema);
app.delete('/schemas/:id', deleteSchema);

app.use((req, res) => {
    res.sendFile('./public/index.html', { root: '.' }, (err) => {
        if (err) {
            console.error('Error sending index file:', err);
            res.status(404).send('Page not found');
        }
    });
})

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
