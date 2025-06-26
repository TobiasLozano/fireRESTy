import { Box, Typography } from "@mui/material";
import DashedBox from "../components/dashed-box";

export default function Home() {
  return (
    <DashedBox maxWidth={400}>
      <Box p={4} textAlign="center">
        <Typography variant="h5">
          What's
          <Typography
            fontSize={20}
            fontFamily="Gloria Hallelujah"
            component="span"
            mx={2}
          >
            FireRESTy?
          </Typography>
        </Typography>
        FireRESTy is a web client for Firebase. But not only that: it focuses on
        migrating Firebase collections to MongoDB schemas, so you can generate
        schemas. It will soon be available to allow access to Firebase via HTTP
        requests.
      </Box>
    </DashedBox>
  );
}
