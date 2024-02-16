"use client";

import { data } from "@/data";
import Box from "@mui/material/Box";
import { FileList } from "./components/FileList";
import { addItem, deleteItem, editItem } from "./utils";

export default function Home() {
  return (
    <Box sx={{ maxWidth: 800, margin: "20px auto" }}>
      <FileList
        items={data}
        addNode={addItem(data)}
        editNode={editItem(data)}
        deleteNode={deleteItem(data)}
      />
    </Box>
  );
}
