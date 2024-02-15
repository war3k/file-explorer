"use client";

import { data } from "@/data";
import Box from "@mui/material/Box";
import { FileList } from "./components/FilesList";

export default function Home() {
  return (
    <Box>
      <FileList items={data} />
    </Box>
  );
}
