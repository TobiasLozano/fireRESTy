import { Box } from "@mui/material";
import { JsonView, allExpanded, darkStyles } from "react-json-view-lite";
import type { Schema } from "../lib/interfaces/schema";
import "react-json-view-lite/dist/index.css";
export default function SchemaVisualizer({ schema }: { schema: Schema }) {
  const properties:Record<string,unknown>={};
  for (const field of schema.fields) {
    properties[field.name] = {
      type: field.type,
      required: field.required,
    };
  }
  const json = {
    title: schema.collectionName,
    properties};
  return (
    <Box className="monospace">
      <JsonView data={json} shouldExpandNode={allExpanded} style={darkStyles} />
    </Box>
  );
}
