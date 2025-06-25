import { Box, Button, Typography } from "@mui/material";

export default function ProjectForm({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) {
  return (
    <Box textAlign="center" display={open ? "block" : "none"}>
      <Box mx="auto" maxWidth={400} p={2}>
        <Typography variant="h6" component="h2">
          Lets create a new project
        </Typography>
        <Typography>Please upload a JSON file </Typography>
        <Button onClick={handleClose} variant="contained" color="secondary">
          Cerrar
        </Button>
      </Box>
    </Box>
  );
}
