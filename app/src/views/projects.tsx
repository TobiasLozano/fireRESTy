import { Box, Typography, Button } from "@mui/material";
import DashedBox from "../components/dashed-box";
import React from "react";
import ProjectForm from "../components/project-form";
import DataTable from "../components/data-table";
import SchemaVisualizer from "../components/scheme-visualizer";

export default function Projects() {
      const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box>

    <DashedBox   maxWidth={400} mb={2}>
         <Box p={4} textAlign="center">
          <Typography variant="h5">You don't have any projects</Typography>
          <Box mt ={4}>

          <Button onClick={handleOpen}  variant="contained" color="secondary" >
            Create one
          </Button>
          <br /><br />
          
          </Box>
       <ProjectForm open={open} handleClose={handleClose} />
        </Box>
     </DashedBox>
          <Typography variant="h6" my={2}>Table I'll use to show data</Typography>

       <DataTable    />
          <Typography variant="h6" my={2}>Schema visualizer</Typography>

       <SchemaVisualizer />
    </Box>
  );

 
}
