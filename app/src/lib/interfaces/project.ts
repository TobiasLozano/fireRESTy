interface Document {
  id: string;
  [key: string]: unknown;
}
export interface Collection {
  length: number;
  name: string;
  data: Document[];
}
export interface Project {
  projectId: string;
  collections: Collection[];
}

export const mockProject: Project = {
  projectId: "project_001",
  collections: [
    {
      name: "users",

      length: 1,
      data: [
        {
          id: "ej393",
          name: "Another Doc",

          value: "test",
          nested: { key: "value", another: "nested value" },
        },
        {
          id: "dj032",
          name: "Another Doc",
          value: "test",
          nested: { key: "value", another: "nested value" },
        },
      ],
    },
    {
      name: "documents",
      length: 2,
      data: [
        { id: "39292", name: "Document 1", value: 42 },
        { id: "839294", name: "Document 2", value: 99 },
      ],
    },
  ],
};
