import { Box, Typography } from "@mui/material";
import DashedBox from "../components/dashed-box";
import React from "react";
import { ProjectContext } from "../providers/context";
import SchemaVisualizer from "../components/scheme-visualizer";
import { mockSchemas } from "../lib/interfaces/schema";
import formatDate from "../lib/utils/format-date";
export default function Schemas() {
  const [projectId, setProjectId] = React.useState<string | null>(null);

  const projectContext = React.useContext(ProjectContext);
  React.useMemo(() => {
    setProjectId(projectContext?.projectId || null);
  }, [projectContext?.projectId]);
  return (
    <Box>
      <DashedBox maxWidth={700} mb={2}>
        <Box p={4} textAlign="center">
          <Typography variant="h5">Saved schema snapshots</Typography>

          <Box mt={4} textAlign={"left"}>
            {mockSchemas.map((schema, index) => (
              <Box>
                <Typography my={2} textAlign={"right"} key={index}>
                  Date: {formatDate(schema.dateCreated)}
                </Typography>

                <SchemaVisualizer schema={{ ...schema }} />
              </Box>
            ))}
          </Box>
        </Box>
      </DashedBox>
    </Box>
  );
}
