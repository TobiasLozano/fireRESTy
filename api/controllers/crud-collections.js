import {  getCollectionDocuments,
  createDocument,
  getDocumentById,
  updateDocumentById,
  deleteDocumentById, } from "../services/firebase/crud-firebase.js";

function extractServiceAccount(headers) {
  return {
    type: headers["type"],
    project_id: headers["project_id"],
    private_key_id: headers["private_key_id"],
    private_key: Buffer.from(headers["private_key_b64"], "base64").toString("utf-8"),
        client_email: headers["client_email"],
    client_id: headers["client_id"],
    auth_uri: headers["auth_uri"],
    token_uri: headers["token_uri"],
    auth_provider_x509_cert_url: headers["auth_provider_x509_cert_url"],
    client_x509_cert_url: headers["client_x509_cert_url"],
  };
}


export async function createDoc(req, res) {
  try {
    const serviceAccount = extractServiceAccount(req.headers);
    const { collection } = req.params;
    const id = await createDocument(serviceAccount, collection, req.body);
    res.json({ success: true, id });
  } catch (error) {
    console.error("Error creating document:", error);
    res.status(500).json({ success: false, message: "Create error" });
  }
}

export async function getDoc(req, res) {
  try {
    const serviceAccount = extractServiceAccount(req.headers);
    const { collection, id } = req.params;
    const doc = await getDocumentById(serviceAccount, collection, id);
    res.json({ success: true, document: doc });
  } catch (error) {
    console.error("Error getting document:", error);
    res.status(500).json({ success: false, message: "Get error" });
  }
}

export async function updateDoc(req, res) {
  try {
    const serviceAccount = extractServiceAccount(req.headers);
    const { collection, id } = req.params;
    await updateDocumentById(serviceAccount, collection, id, req.body);
    res.json({ success: true });
  } catch (error) {
    console.error("Error updating document:", error);
    res.status(500).json({ success: false, message: "Update error" });
  }
}

export async function deleteDoc(req, res) {
  try {
    const serviceAccount = extractServiceAccount(req.headers);
    const { collection, id } = req.params;
    await deleteDocumentById(serviceAccount, collection, id);
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting document:", error);
    res.status(500).json({ success: false, message: "Delete error" });
  }
}

export async function getCollectionData(req, res) {
  try {
    const serviceAccount = extractServiceAccount(req.headers);
    console.log(serviceAccount);
    const { collection } = req.params;
    const documents = await getCollectionDocuments(serviceAccount, collection);

    res.json({ success: true, data: documents });
  } catch (error) {
    console.error("Error getting collection data:", error);
    res.status(500).json({ success: false, message: "Failed to get collection data" });
  }
}