import type ServiceAccount from "../interfaces/service-account";

export default class HttpClient {
  private serviceAccount: ServiceAccount;
  private baseUrl: string = import.meta.env.VITE_BACKEND_URL??"http://localhost:3000";
  constructor(serviceAccount: ServiceAccount) {
    this.serviceAccount = serviceAccount;
  }
  private getHeaders() {
    const headers: Record<string, string> = {};

    Object.entries(this.serviceAccount).forEach(([key, value]) => {
      if (key === "private_key") {
        headers[key + "_b64"] = btoa(value);
      } else {
        headers[key] = value;
      }
    });
    return headers;
  }
  async getCollections() {
    const response = await fetch(`${this.baseUrl}/firestore/collections`, {
      method: "GET",
      headers: this.getHeaders(),
    });
    return response.json();
  }
    async generateSchema(collectionName: string) {
    const response = await fetch(`${this.baseUrl}/firestore/schemas?collection=${collectionName}`, {
      method: "POST",
      headers: this.getHeaders(),
    });
    return response.json();
  }

    async getSchemas(projectId: string) {
    const response = await fetch(`${this.baseUrl}/schemas/${projectId}`, {
      method: "GET",
    });
    return response.json();
  }
  async get(collection: string) {
    const response = await fetch(`${this.baseUrl}/${collection}`, {
      method: "GET",
      headers: {
        ...this.serviceAccount,
      },
    });
    return response.json();
  }
  async post(collection: string, body: Record<string, unknown>) {
    const response = await fetch(`${this.baseUrl}/${collection}`, {
      method: "POST",
      headers: {
        ...this.serviceAccount,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    return response.json();
  }

  async put(collection: string, id: string, body: Record<string, unknown>) {
    const response = await fetch(`${this.baseUrl}/${collection}/${id}`, {
      method: "PUT",
      headers: {
        ...this.serviceAccount,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    return response.json();
  }

  async delete(collection: string, id: string) {
    const response = await fetch(`${this.baseUrl}/${collection}/${id}`, {
      method: "DELETE",
      headers: {
        ...this.serviceAccount,
      },
    });
    return response.json();
  }
}
