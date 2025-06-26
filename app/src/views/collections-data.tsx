import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import DashedBox from "../components/dashed-box";
import React from "react";
import { ProjectContext } from "../providers/context";
import CollectionsDataTable from "../components/data-table";

import { type Collection } from "../lib/interfaces/project";
import HttpClient from "../lib/network/http-client";

export default function DataView() {
  const [projectId, setProjectId] = React.useState<string | null>(null);
  const [collections, setCollections] = React.useState<Collection[]>([]);

  const [tabIndex, setTabIndex] = React.useState(0);
  const [selectedCollection, setselectedCollection] =
    React.useState<Collection | null>(null);
  const projectContext = React.useContext(ProjectContext);

  const handleGenerateSchema = async () => {
    const project = await projectContext?.getProject();
    if (project) {
      const client = new HttpClient(project);
      await client.generateSchema(selectedCollection?.name || "");
    }
  };
  React.useMemo(() => {
    if (collections.length > 0) {
      console.log(selectedCollection);
      setselectedCollection(collections[tabIndex]);
    }
  }, [tabIndex]);

  React.useEffect(() => {
    if (collections.length > 0) {
      setselectedCollection(collections[0]);
    }
  }, []);
  React.useMemo(() => {
    setProjectId(projectContext?.projectId || null);
  }, [projectContext?.projectId]);

  React.useMemo(() => {
    setCollections(projectContext?.collections ?? []);
  }, [projectContext?.collections]);
  return (
    <DashedBox
      sx={{ width: { md: "calc(90vw - 250px)", sm: "100 px" } }}
      mb={2}
    >
      <Box p={4} textAlign="center">
        <Typography variant="h5">{projectId}</Typography>
        <Tabs
          value={tabIndex}
          onChange={(e, newValue) => setTabIndex(newValue)}
          centered
        >
          {collections.map((collection, index) => (
            <Tab label={collection.name} value={index} />
          ))}
        </Tabs>
        <Box mt={2}>
          {selectedCollection && (
            <Box display="flex" justifyContent="end" gap={2}>
              <Typography variant="h6">
                Collection length: ({selectedCollection.data.length} items)
              </Typography>
              <Button variant="contained" onClick={handleGenerateSchema}>Save Schema</Button>
            </Box>
          )}
        </Box>
        <Box mt={4}>
          {projectId && selectedCollection && (
            <CollectionsDataTable collection={{ ...selectedCollection }} />
          )}
        </Box>
      </Box>
    </DashedBox>
  );
}
