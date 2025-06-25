import type ServiceAccount from "../interfaces/service-account";

export default class HttpClient {
  private serviceAccount: ServiceAccount;
  private baseUrl: string = "http:localhost:3000";
  constructor(serviceAccount: ServiceAccount) {
    this.serviceAccount = serviceAccount;
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

  async put(collection: string,id:string, body: Record<string, unknown>) {
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
