import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function getFirestoreInstance(serviceAccount) {
  let app;
  if (getApps().length === 0) {
    app = initializeApp({ credential: cert(serviceAccount) });
  } else {
    app = getApps()[0];
  }
  return getFirestore(app);
}

export async function getCollectionDocuments(serviceAccount, collection) {
  const db = getFirestoreInstance(serviceAccount);
  const snapshot = await db.collection(collection).get();

  const documents = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  return documents;
}


export async function createDocument(serviceAccount, collection, data) {
  const db = getFirestoreInstance(serviceAccount);
  const docRef = await db.collection(collection).add(data);
  return docRef.id;
}

export async function getDocumentById(serviceAccount, collection, id) {
  const db = getFirestoreInstance(serviceAccount);
  const doc = await db.collection(collection).doc(id).get();
  if (!doc.exists) throw new Error("Document not found");
  return { id: doc.id, ...doc.data() };
}

export async function updateDocumentById(serviceAccount, collection, id, data) {
  const db = getFirestoreInstance(serviceAccount);
  await db.collection(collection).doc(id).update(data);
}

export async function deleteDocumentById(serviceAccount, collection, id) {
  const db = getFirestoreInstance(serviceAccount);
  await db.collection(collection).doc(id).delete();
}
