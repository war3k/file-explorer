import { useState, useCallback } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  TextField,
  DialogTitle,
  Box,
} from "@mui/material";
import { Node } from "../utils";

export function useEditDialog(
  onSubmit: (data: { name: string; id: string }) => void
) {
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [id, setId] = useState<string>("");

  const handleOpen = useCallback((node: Node) => {
    setOpen(true);
    setName(node.name);
    setId(node.id);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setName("");
    setId("");
  }, []);

  const handleSubmit = useCallback(() => {
    onSubmit({ name, id });
    handleClose();
  }, [name, handleClose]);

  const dialog = (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Rename</DialogTitle>
      <DialogContent>
        <Box sx={{ p: 2 }}>
          <TextField
            label="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Box>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );

  return {
    openEditDialog: handleOpen,
    editDialog: dialog,
  };
}
