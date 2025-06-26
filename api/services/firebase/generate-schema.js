import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import inferType from "../../utils/infer-type.js";
 
export const generateCollectionSchema = async (serviceAccount,collectionName) => {
  try {
 
    let app;
    if (getApps().length === 0) {
      app = initializeApp({ credential: cert(serviceAccount) });
    } else {
      app = getApps()[0];
    }

    const db = getFirestore(app);
    const snapshot = await db.collection(collectionName).limit(1).get();

    if (snapshot.empty) {
      throw new Error("Collection is empty");
    }

    const doc = snapshot.docs[0];
    const rawData = doc.data();

    const fields = Object.entries(rawData).map(([key, value]) => ({
      name: key,
      type: inferType(value),
      required: value !== undefined && value !== null,
    }));

    const schema = {
      dateCreated: new Date(),
      projectId: serviceAccount.project_id,
      collectionName,
      fields,
    };

    return schema;
  } catch (err) {
    console.error("Error generating schema:", err);
    throw new Error("Failed to generate schema: " + err.message);
  }
};
