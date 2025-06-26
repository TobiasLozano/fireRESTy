import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

/* interface ServiceAccount {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
}
 */
export const getFirestoreCollectionsInfo = async (serviceAccount) => {
  let app;
  if (getApps().length === 0) {
    app = initializeApp({
      credential: cert(serviceAccount),
    });
  } else {
    app = getApps()[0];
  }

  const db = getFirestore(app);
  const collections = await db.listCollections();

  const result = await Promise.all(
    collections.map(async (col) => {
      const snapshot = await col.get();
      const docs = await col.limit(5).get();

      const firstDocs = docs.docs.map((doc) => ({
        id: doc.id,
       ... doc.data(),
      }));

      return {
        name: col.id,
        length: snapshot.size,
        data: firstDocs,
      };
    })
  );

  return result;
};