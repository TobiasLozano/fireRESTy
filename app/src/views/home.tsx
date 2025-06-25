import { Box, Typography } from "@mui/material";
import DashedBox from "../components/dashed-box";

export default function Home() {
  return (
    <DashedBox    maxWidth={400}>

         <Box p={4} textAlign="center">
            <Typography variant="h5">
                What's 
            <Typography fontSize={20}  fontFamily="Gloria Hallelujah" component="span" mx={2}>

                FireRESTy?
                </Typography>
            </Typography>

      Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum magnam quis
      consequatur ad sit quasi temporibus? Iure quasi perspiciatis odio nam
      aliquam consequatur sint soluta architecto, beatae veniam blanditiis quo.
        </Box>
     </DashedBox>
  );
}
