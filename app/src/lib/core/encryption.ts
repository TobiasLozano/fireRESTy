import crypto from "crypto-js";

export default class Encryption {
  private encryptionKey = import.meta.env.VITE_ENCRYPTION_KEY;

  public encrypt(text: string): string {
    return crypto.AES.encrypt(text, this.encryptionKey).toString();
  }
  public decrypt(textToDecrypt: string): string {
    return crypto.AES.decrypt(textToDecrypt, this.encryptionKey).toString(
      crypto.enc.Utf8
    );
  }
}
