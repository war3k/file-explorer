"use client";
import { SxProps } from "@mui/material";
import { FileNode } from "../utils";
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

const styles: Record<
  | "root"
  | "list"
  | "icon"
  | "item"
  | "itemText"
  | "itemIcon"
  | "directoryItem"
  | "collapseIcon",
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
  collapseIcon: {
    marginLeft: "-14px",
    position: "absolute",
    lineHeight: "14px",
  },
};

export function FileList(props: {
  items: FileNode[];
  sx?: SxProps;
  testId?: string;
}) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const handleItemClick = (item: FileNode) => () => {
    console.log(item);
    if (item.type === "directory") {
      const newExpanded = new Set(expanded);
      if (expanded.has(item.id)) {
        newExpanded.delete(item.id);
      } else {
        newExpanded.add(item.id);
      }
      setExpanded(newExpanded);
    } else if (item.type === "file") {
      return console.log(item.name);
    }
  };

  return (
    <List data-testid={props.testId} sx={props.sx}>
      {props.items.map((item) => {
        switch (item.type) {
          case "file":
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
                </ListItemButton>
              </Box>
            );
          case "directory":
            return (
              <Box key={item.id}>
                <ListItemButton
                  key={item.name}
                  sx={styles.item}
                  onClick={handleItemClick(item)}
                >
                  <Box sx={styles.collapseIcon}>
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
                  {expanded.has(item.id) ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse
                  in={expanded.has(item.id)}
                  timeout="auto"
                  unmountOnExit
                >
                  <FileList items={item.children} sx={styles.list} />
                </Collapse>
              </Box>
            );
        }
      })}
    </List>
  );
}
