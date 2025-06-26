import mongoose from 'mongoose';

const FieldSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  required: { type: Boolean, required: true },
});

const SchemaDefinition = new mongoose.Schema({
  dateCreated: { type: Date, default: Date.now },
  projectId: { type: String, required: true },
  collectionName: { type: String, required: true },
  fields: [FieldSchema],
});

export default mongoose.model('Schema', SchemaDefinition);