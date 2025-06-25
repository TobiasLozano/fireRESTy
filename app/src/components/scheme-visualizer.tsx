import { Box } from '@mui/material';
import { JsonView, allExpanded, darkStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
export default function SchemaVisualizer() {
  const json = {
    name: "fireesty-api",
    version: "1.0.0",
    description: "",
    type: "module",
  };
  return (
    <Box className="json-view">

    <JsonView 
    
    
    data={json}
    
    shouldExpandNode={allExpanded}
    style={darkStyles}
    />
    </Box>
  );
}
