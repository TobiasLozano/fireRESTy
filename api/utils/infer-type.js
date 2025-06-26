export default function inferType(value) {
  if (value === null) return "null";
  if (value instanceof Date) return "date";
  if (Array.isArray(value)) return "array";
  if (typeof value === "object") return "object";
  return typeof value; 
}
