export default function isServiceAccount(obj:Record<string,unknown>): boolean{
    const fields = ["type", "project_id", "private_key_id", "private_key", "client_email", "client_id", "auth_uri", "token_uri", "auth_provider_x509_cert_url", "client_x509_cert_url"];   

    return fields.every(field => field in obj);
}