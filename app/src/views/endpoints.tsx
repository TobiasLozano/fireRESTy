import { Box, Typography } from "@mui/material";
import DashedBox from "../components/dashed-box";
import React from "react";
import { ProjectContext } from "../providers/context";

export default function Endpoints() {
   const [projectId, setProjectId] = React.useState<string | null>(null);
  
    const projectContext = React.useContext(ProjectContext);
    React.useMemo(() => {
      setProjectId(projectContext?.projectId || null);
    }, [projectContext?.projectId]);
  return (
    <Box>

    <DashedBox   maxWidth={700} mb={2}>
         <Box p={4} textAlign="center">
          <Typography variant="h5">Project endpoints</Typography>
          <Box mt ={4}>

        
        </Box>
        </Box>
     </DashedBox>
         </Box>
     
  );

 
}
