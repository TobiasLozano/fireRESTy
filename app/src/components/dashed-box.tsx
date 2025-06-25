import { Box, Paper, type BoxProps } from "@mui/material";

interface DashedBoxProps extends BoxProps {
  children: React.ReactNode;
}

export default function DashedBox({ children, ...rest }: DashedBoxProps) {
  return ( 
       <Box boxShadow={4}  border="dashed 2px" borderRadius={4} mx="auto" {...rest}>
         <Paper  sx={{  borderRadius:4}} >
      {children}
        </Paper>
     </Box>
  );
}
