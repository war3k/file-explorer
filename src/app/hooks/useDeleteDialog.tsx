import { useState, useCallback } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  DialogTitle,
  DialogContentText,
  Box,
} from "@mui/material";
import { Node, NodeType } from "../utils";

export function useDeleteDialog(onSubmit: (data: { id: string }) => void) {
  const [open, setOpen] = useState<boolean>(false);
  const [node, setNode] = useState<Node | null>(null);

  const handleOpen = useCallback((node: Node) => {
    setOpen(true);
    setNode(node);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setNode(null);
  }, []);

  const handleSubmit = useCallback(() => {
    if (node && node.id) {
      onSubmit({ id: node.id });
    }
    handleClose();
  }, [node, handleClose]);

  const dialog = (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete</DialogTitle>
      <DialogContent>
        <Box sx={{ p: 2 }}>
          <DialogContentText>
            Are you sure to delete <b>{node?.name}</b>?
          </DialogContentText>
          {node?.type === NodeType.DIRECTORY ? (
            <DialogContentText>
              (Whole content inside will be deleted too.)
            </DialogContentText>
          ) : null}
        </Box>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Delete
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );

  return {
    openDeleteDialog: handleOpen,
    deleteDialog: dialog,
  };
}
