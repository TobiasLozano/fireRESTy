import { Buffer } from "buffer";
import { generateCollectionSchema } from "../services/firebase/generate-schema.js";
export default async function  generateSchema  (req, res)  {
  try {
    const headers = req.headers;
    const collectionName = req.query.collection;

    if (!collectionName) {
      return res.status(400).json({ error: "Missing collection name" });
    }

    const serviceAccount = {
      type: headers["type"],
      project_id: headers["project_id"],
      private_key_id: headers["private_key_id"],
      private_key: Buffer.from(headers["private_key_b64"], "base64").toString(
        "utf-8"
      ),
      client_email: headers["client_email"],
      client_id: headers["client_id"],
      auth_uri: headers["auth_uri"],
      token_uri: headers["token_uri"],
      auth_provider_x509_cert_url: headers["auth_provider_x509_cert_url"],
      client_x509_cert_url: headers["client_x509_cert_url"],
    };

    const schema = await generateCollectionSchema(serviceAccount, collectionName);
    console.log(JSON.stringify(schema));

 
     res.json(schema);
  } catch (err) {
    console.error("Error generating schema:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
