"use client";
import { IconButton, SxProps } from "@mui/material";
import { Node, NodeType } from "../utils";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import FolderIcon from "@mui/icons-material/Folder";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import RemoveIcon from "@mui/icons-material/RemoveCircle";
import { useAddDialog } from "../hooks/useAddDialog";
import { useEditDialog } from "../hooks/useEditDialog";
import { useDeleteDialog } from "../hooks/useDeleteDialog";

const styles: Record<
  "root" | "list" | "icon" | "item" | "itemText" | "itemIcon" | "directoryItem",
  SxProps
> = {
  root: { display: "flex" },
  list: { padding: "8px", paddingRight: 0 },
  icon: { fontSize: "16px" },
  item: {
    padding: "8px 16px",
    m: "1px",
    borderRadius: "6px",
    minHeight: "48px",
    color: "#43gd23",
  },
  itemText: { fontSize: "14px" },
  itemIcon: {
    minWidth: "initial",
    marginRight: "16px",
  },
  directoryItem: { m: "1px", p: "4px", pl: "32px", borderRadius: "6px" },
};

export function FileList(props: {
  items: Node[];
  sx?: SxProps;
  testId?: string;
  addNode: (
    parentNodeId: string,
    data: {
      name: string;
      type: NodeType;
    }
  ) => void;
  editNode: (data: { name: string; id: string }) => void;
  deleteNode: (data: { id: string }) => void;
}) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const { addDialog, openAddDialog } = useAddDialog(props.addNode);
  const { editDialog, openEditDialog } = useEditDialog(props.editNode);
  const { deleteDialog, openDeleteDialog } = useDeleteDialog(props.deleteNode);

  const handleItemClick = (item: Node) => () => {
    if (item.type === NodeType.DIRECTORY) {
      const newExpanded = new Set(expanded);
      if (expanded.has(item.id)) {
        newExpanded.delete(item.id);
      } else {
        newExpanded.add(item.id);
      }
      setExpanded(newExpanded);
    }
  };

  const handleAddClick = (itemId: string) => (event: React.SyntheticEvent) => {
    event.stopPropagation();
    openAddDialog(itemId);
  };

  const handleEditClick = (item: Node) => (event: React.SyntheticEvent) => {
    event.stopPropagation();
    openEditDialog(item);
  };

  const handleDeleteClick = (item: Node) => (event: React.SyntheticEvent) => {
    event.stopPropagation();
    openDeleteDialog(item);
  };
  return (
    <>
      <List data-testid={props.testId} sx={props.sx}>
        {props.items.map((item) => {
          switch (item.type) {
            case NodeType.FILE:
              return (
                <Box key={item.id}>
                  <ListItemButton
                    key={item.name}
                    sx={styles.item}
                    onClick={handleItemClick(item)}
                  >
                    <ListItemIcon sx={styles.itemIcon}>
                      <InsertDriveFileIcon sx={styles.icon} />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.name}
                      primaryTypographyProps={{ sx: styles.itemText }}
                    />
                    <IconButton onClick={handleEditClick(item)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={handleDeleteClick(item)}>
                      <RemoveIcon />
                    </IconButton>
                  </ListItemButton>
                </Box>
              );
            case NodeType.DIRECTORY:
              return (
                <Box key={item.id}>
                  <ListItemButton
                    key={item.name}
                    sx={styles.item}
                    onClick={handleItemClick(item)}
                  >
                    <Box>
                      {expanded.has(item.id) ? (
                        <FolderOpenIcon sx={styles.icon} />
                      ) : (
                        <FolderIcon sx={styles.icon} />
                      )}
                    </Box>
                    <ListItemText
                      primary={item.name}
                      primaryTypographyProps={{ sx: styles.itemText }}
                    />
                    <IconButton onClick={handleAddClick(item.id)}>
                      <AddIcon />
                    </IconButton>
                    <IconButton onClick={handleEditClick(item)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={handleDeleteClick(item)}>
                      <RemoveIcon />
                    </IconButton>
                    {expanded.has(item.id) ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse
                    in={expanded.has(item.id)}
                    timeout="auto"
                    unmountOnExit
                  >
                    <FileList
                      items={item.children}
                      sx={styles.list}
                      addNode={props.addNode}
                      editNode={props.editNode}
                      deleteNode={props.deleteNode}
                    />
                  </Collapse>
                </Box>
              );
          }
        })}
      </List>
      {addDialog}
      {editDialog}
      {deleteDialog}
    </>
  );
}
