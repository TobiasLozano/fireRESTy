import { Box, Tab, Tabs, Typography } from "@mui/material";
import DashedBox from "../components/dashed-box";
import React from "react";
import { ProjectContext } from "../providers/context";
import CollectionsDataTable from "../components/data-table";

import { mockProject, type Collection } from "../lib/interfaces/project";

export default function DataView() {
  const [projectId, setProjectId] = React.useState<string | null>(null);
  const [tabIndex, setTabIndex] = React.useState(0);
  const [selectedCollection, setselectedCollection] =
    React.useState<Collection | null>(null);
  const collections = mockProject.collections;
 React. useMemo(() => {
    if (collections.length > 0) {
      console.log(selectedCollection );
      setselectedCollection(collections[tabIndex]);
    }
  }, [tabIndex]);

  const projectContext = React.useContext(ProjectContext);
  React.useMemo(() => {
    setProjectId(projectContext?.projectId || null);
  }, [projectContext?.projectId]);
  return (
       <DashedBox   sx={{width:{md:'calc(90vw - 250px)',sm:'100 px'}}} mb={2}>
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
          <Box mt={4}>
            {projectId && selectedCollection&& (
              <CollectionsDataTable collection={{...selectedCollection}} />
            )}
          </Box>
        </Box>
      </DashedBox>
   );
}
