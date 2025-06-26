import { Box, Typography, Button } from "@mui/material";
import DashedBox from "../components/dashed-box";
import React from "react";
import ProjectForm from "../components/project-form";
import { ProjectContext } from "../providers/context";

export default function Projects() {
  const [open, setOpen] = React.useState(false);
   const [projectId, setProjectId] = React.useState<string | null>(null);
 
   const projectContext = React.useContext(ProjectContext);
   React.useMemo(() => {
     setProjectId(projectContext?.projectId || null);
   }, [projectContext?.projectId]);

  const handleOpen = () => setOpen(true);

  return (
    <Box>
      <DashedBox maxWidth={700} mb={2}>
        <Box p={4} textAlign="center">
          {!projectId && (
            <>
              <Typography variant="h5">You don't have any projects</Typography>
              <Box mt={4}>
                <Button
                  onClick={handleOpen}
                  variant="contained"
                  color="secondary"
                >
                  Create one
                </Button>
              </Box>
            </>
          )}
          <ProjectForm open={open||projectId!==null} projectId={projectId} />
        </Box>
      </DashedBox>
    </Box>
  );
}
