import { useState, useCallback } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Button,
  Radio,
  RadioGroup,
  TextField,
  DialogTitle,
  Box,
} from "@mui/material";
import { NodeType } from "../utils";
// Import other necessary components

export function useAddDialog(
  onSubmit: (
    parentNodeId: string,
    data: {
      name: string;
      type: NodeType;
    }
  ) => void
) {
  const [open, setOpen] = useState<boolean>(false);
  const [parentNodeId, setParentNodeId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<NodeType>(NodeType.DIRECTORY);

  const handleOpen = useCallback((nodeId: string) => {
    setParentNodeId(nodeId);
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setName("");
    setType(NodeType.DIRECTORY);
  }, []);

  const handleSubmit = useCallback(() => {
    onSubmit(parentNodeId, { name, type });
    handleClose();
  }, [type, name, handleClose]);

  const handleTypeChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setType(event.target.value as NodeType);
    },
    []
  );

  const dialog = (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add directory or file</DialogTitle>
      <DialogContent>
        <Box sx={{ p: 2 }}>
          <TextField
            label="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <RadioGroup value={type} onChange={handleTypeChange}>
            <FormControlLabel
              value={NodeType.DIRECTORY}
              control={<Radio />}
              label="Directory"
            />
            <FormControlLabel
              value={NodeType.FILE}
              control={<Radio />}
              label="File"
            />
          </RadioGroup>
        </Box>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Add
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );

  return {
    openAddDialog: handleOpen,
    addDialog: dialog,
  };
}
