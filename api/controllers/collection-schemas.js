import Schema from "../models/collection-schema.js";

export const createSchema = async (req, res) => {
  try {
    const schema = new Schema(req.body);
    await schema.save();
    res.status(201).json(schema);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getSchemas = async (req, res) => {
  const schemas = await Schema.find();
  res.json(schemas);
};


export const getSchemaByProjectId = async (req, res) => {
  try {
    const schema = await Schema.find({projectId: req.params.id});
    if (!schema) return res.status(404).json({ error: "Not found" });
    res.json(schema);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
};

export const getSchemaById = async (req, res) => {
  try {
    const schema = await Schema.findById(req.params.id);
    if (!schema) return res.status(404).json({ error: "Not found" });
    res.json(schema);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
};

export const updateSchema = async (req, res) => {
  try {
    const updated = await Schema.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteSchema = async (req, res) => {
  try {
    const deleted = await Schema.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
