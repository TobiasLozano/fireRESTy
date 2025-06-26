import { Box, Button, Link, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useContext, useState } from "react";
import { allExpanded, darkStyles, JsonView } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";
import { ProjectContext } from "../providers/context";
import isServiceAccount from "../lib/utils/check-service-account-object";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const json = {
  type: "service_account",
  project_id: "your-project",
  private_key_id: "######",
  private_key: "-----BEGIN PRIVATE KEY----####",
  client_email: "firebase-adminsdk-272td@your-project.iam.gserviceaccount.com",
  client_id: "######",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/#######/",
};
export default function ProjectForm({ open,projectId }: { open: boolean, projectId?: string|null }) {
  
  const [file, setFile] = useState<File | null>();
  const projectContext = useContext(ProjectContext);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      console.log("Selected file:", selectedFile);
    }
  };
  const handleSaveJson = async () => {
    if (file) {
      const data = await file.text();
      console.log(data);
      const project = JSON.parse(data);
      if (isServiceAccount(project as unknown as Record<string, unknown>)) {
        projectContext?.setProject(project);
      }
    }
  };
  const handleClearProject = () => {
    projectContext?.clearProject();
  };

  return (
    <Box textAlign="center" display={open ? "block" : "none"}>
      {projectId ?
      <>
       <Typography variant="h5" fontWeight="bold" component="h2" mb={2}>
        Theres a project loaded
      </Typography>
      </>:
    <>
    <Typography variant="h5" fontWeight="bold" component="h2" mb={2}>
        Lets create a new project
      </Typography>
      <Typography mb={1} variant="body1">
        Please upload the firebase.cert.json file of your project
      </Typography>
      <Link href="https://clemfournier.medium.com/how-to-get-my-firebase-service-account-key-file-f0ec97a21620">
        <Typography>
          How to get my firebase service account key file?
        </Typography>
      </Link>
      <Typography mb={1} variant="body1">
        It should look like this:
      </Typography>

      <Box textAlign="left" className="monospace">
        <JsonView
          data={json}
          shouldExpandNode={allExpanded}
          style={darkStyles}
        />
      </Box>
    

      <Typography variant="caption" mb={2} display="block">
        It will be stored securely in your local storage, not in the database :)
      </Typography>
         </> 
      }
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        {projectId ? "Change file" : "Select file"}
    
         <VisuallyHiddenInput
          type="file"
          onChange={handleFileChange}
          multiple={false}
          accept="application/json"
        />
      </Button>
      <Typography variant="caption" display="block">
        {file ? `File: ${file.name}` : "No file selected"}
      </Typography>
      <Box mt={2} textAlign="right">
         <Button
          onClick={handleClearProject}
          variant="outlined"
          color="error"
        >
          Clear
        </Button>
        <Button
          sx={{ ml: 2 }}

          onClick={handleSaveJson}
          disabled={!file}
          variant="contained"
          color="secondary"
        >
          Save
        </Button>

       
      </Box>
    </Box>
  );
}
