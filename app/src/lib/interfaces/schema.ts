export interface Field {
  name: string;
  type: string;
  required: boolean;
}
export interface Schema {
  dateCreated: string;
  projectId: string;
  description: string;
  fields: Field[];
}

export const mockSchema: Schema = {
  dateCreated: "2025-06-25T12:00:00Z",
  projectId: "project_12345",
  description: "This is a sample schema for a project.",
  fields: [
    { name: "title", type: "string", required: true },
    { name: "createdAt", type: "date" , required: false},
  ],
};
