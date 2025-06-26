import { Box, IconButton, Typography } from "@mui/material";
import DashedBox from "../components/dashed-box";
import React from "react";
import { ProjectContext } from "../providers/context";
import { type Collection } from "../lib/interfaces/project";
import { type Schema } from "../lib/interfaces/schema";
import { ExpandMore } from "@mui/icons-material";
import { JsonView, allExpanded, darkStyles } from "react-json-view-lite";
import HttpClient from "../lib/network/http-client";

export default function Endpoints() {
  const [projectId, setProjectId] = React.useState<string | null>(null);
  const [collections, setCollections] = React.useState<Collection[]>([]);
  const [schemas, setSchemas] = React.useState<Schema[]>([]);

  const projectContext = React.useContext(ProjectContext);

  React.useMemo(() => {
    setCollections(projectContext?.collections ?? []);
  }, [projectContext?.collections]);

  React.useEffect(() => {
    async function fetchSchemas() {
      if (projectContext) {
        const project = await projectContext?.getProject();
        if (project) {
          const client = new HttpClient(project);
          const _schemas = await client.getSchemas(projectId || "");
          setSchemas(_schemas || []);
        }
      }
    }
    fetchSchemas();
  }, []);
  const baseUrl = "http:localhost:3000";
  const methods = [
    { method: "POST", bgColor: "#4caf50", borderColor: "green" },
    { method: "GET", bgColor: "#1de9b6", borderColor: "cyan" },
    { method: "PUT", bgColor: "#ff9100", borderColor: "orange" },
    { method: "DELETE", bgColor: "#f44336", borderColor: "red" },
  ];

  React.useMemo(() => {
    setProjectId(projectContext?.projectId || null);
  }, [projectContext?.projectId]);
  return (
    <Box>
      <DashedBox maxWidth={700} mb={2}>
        <Box p={4} textAlign="center">
          <Typography variant="h5">Project endpoints</Typography>
          <Typography variant="h6">Will be available soon</Typography>
          {collections.map((collection) => (
            <Box my={2}>
              <Typography> {collection.name}</Typography>
              {methods.map((method) => (
                <EndpointDetail
                  baseUrl={baseUrl}
                  bgColor={method.bgColor}
                  collection={collection}
                  method={method.method}
                  borderColor={method.borderColor}
                  schema={schemas.find(
                    (s) => s.collectionName === collection.name
                  )}
                />
              ))}
            </Box>
          ))}
        </Box>
      </DashedBox>
    </Box>
  );
}
export function EndpointDetail({
  baseUrl,
  collection,
  method,
  borderColor,
  bgColor,
  schema,
}: {
  baseUrl: string;
  method: string;
  borderColor: string;
  bgColor: string;
  collection: { name: string };
  schema?: Schema;
}) {
  const [showSchema, setShowSchema] = React.useState(false);
  const json: Record<string, unknown> = {};
  if (schema) {
    for (const field of schema.fields) {
      json[field.name] = field.type;
    }
  }
  return (
    <Box
      className="monospace"
      border={2}
      my={1}
      borderColor={borderColor}
      p={2}
      borderRadius={2}
    >
      <Box
        display="flex"
        alignItems="center"
        sx={{ justifyContent: "space-between" }}
      >
        <Box display="flex" alignItems="center">
          <Box bgcolor={bgColor} p={1} borderRadius={1} mr={2}>
            {method}
          </Box>
          {`${baseUrl}/${collection.name}`}
        </Box>
        {method === "POST" && (
          <Box textAlign="right">
            <IconButton
              aria-label="delete"
              onClick={() => setShowSchema(!showSchema)}
            >
              <ExpandMore />
            </IconButton>
          </Box>
        )}
      </Box>

      {showSchema && (
        <Box mt={2} textAlign="left">
          <Typography variant="subtitle1">Request body schema:</Typography>
          <JsonView
            data={json}
            shouldExpandNode={allExpanded}
            style={darkStyles}
          />
        </Box>
      )}
    </Box>
  );
}
