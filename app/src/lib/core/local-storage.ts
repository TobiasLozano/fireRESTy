import type Encryption from "../core/encryption";

export default class EncryptedLocalStorage {
  private encryption: Encryption;
  constructor(encryption: Encryption) {
    this.encryption = encryption;
  }

  public saveItem(key: string, data: string) {
    if (typeof window !== "undefined") {
    localStorage.setItem(key, this.encryption.encrypt(data));
    }
  }
  public getItem(key: string): string | null {
    if (typeof window === "undefined") {
      return null;
    }
    const item = localStorage.getItem(key);
    if (item) {
      return this.encryption.decrypt(item);
    }
    return null;
  }
  public removeItem(key: string) {
    localStorage.removeItem(key);
  }
}
