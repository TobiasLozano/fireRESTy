import { Box, IconButton, Typography } from "@mui/material";
import DashedBox from "../components/dashed-box";
import React from "react";
import { ProjectContext } from "../providers/context";
import { type Collection } from "../lib/interfaces/project";
import { type Schema } from "../lib/interfaces/schema";
import { ExpandMore } from "@mui/icons-material";
import { JsonView, allExpanded, darkStyles } from "react-json-view-lite";
import HttpClient from "../lib/network/http-client";
import type ServiceAccount from "../lib/interfaces/service-account";

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
  const baseUrl = "http://localhost:3000/api";
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
      <DashedBox maxWidth={900} mb={2}>
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
                  schema={
                    schemas.length > 0
                      ? schemas.find(
                          (s) => s.collectionName === collection.name
                        )
                      : undefined
                  }
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
  const projectContext = React.useContext(ProjectContext);
  const [project, setProject] = React.useState<ServiceAccount | null>(null);

  const [showSchema, setShowSchema] = React.useState(false);
  const json: Record<string, unknown> = {};
  if (schema) {
    for (const field of schema.fields) {
      json[field.name] = field.type;
    }
  }
  const handleShowSchema = async (_showSchema: boolean) => {
    setShowSchema(_showSchema);
    if (projectContext) {
      const _project = await projectContext?.getProject();
      setProject(_project);
    }
  };
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
        <Box textAlign="right">
          <IconButton
            aria-label="delete"
            onClick={() => handleShowSchema(!showSchema)}
          >
            <ExpandMore />
          </IconButton>
        </Box>
      </Box>

      {showSchema && (
        <Box mt={2} textAlign="left">
          <Typography variant="subtitle1">Request body schema:</Typography>
          <JsonView
            data={json}
            shouldExpandNode={allExpanded}
            style={darkStyles}
          />
          {project && method==='GET' && (
            <>
          <Typography my={2} variant="subtitle1">
            CURL example:
          </Typography>
            <Typography mb={2} className="monospace" overflow="scroll" >
              {`curl -X ${method} ${baseUrl}/${collection.name} \\ 
--header 'type: service_account' \\' 
--header 'project_id: ${project.project_id}' \\' 
--header 'private_key_id: ${project.private_key_id}' \\' 
--header 'private_key_b64: ${btoa(project.private_key)}' \\' 
--header 'client_email: ${project.client_email}' \\' 
--header 'client_id: ${project.client_id}' \\' 
--header 'auth_uri: ${project.auth_uri}' \\' 
--header 'token_uri: ${project.token_uri}' \\' 
--header 'auth_provider_x509_cert_url: ${project.auth_provider_x509_cert_url}' \\' 
--header 'client_x509_cert_url: ${project.client_x509_cert_url}'
`}
            </Typography>
            </>
          )}
        </Box>
      )}
    </Box>
  );
}
