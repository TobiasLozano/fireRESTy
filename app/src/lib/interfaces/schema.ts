export interface Field {
  name: string;
  type: string;
  required: boolean;
}
export interface Schema {
  dateCreated: Date;
  projectId: string;
  collectionName: string;
  description: string;
  fields: Field[];
}

export const mockSchemas: Schema[] = [
  {
    dateCreated: new Date("2025-03-23T12:00:00Z"),
    projectId: "project_12345",
    collectionName: "users",
    description: "This is a sample schema for a project.",
    fields: [
      { name: "title", type: "string", required: true },
      { name: "createdAt", type: "date", required: false },
    ],
  },
  {
    dateCreated: new Date("2025-03-23T12:00:00Z"),
    projectId: "project_12345",
    collectionName: "documents",

    description: "This is a sample schema for a project.",
    fields: [
      { name: "title", type: "string", required: true },
      { name: "createdAt", type: "date", required: false },
    ],
  },
];
