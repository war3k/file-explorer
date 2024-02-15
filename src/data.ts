import { FileNode, generateUniqueId } from "./app/utils";

export const data: FileNode[] = [
  {
    id: generateUniqueId(),
    name: "folder 1",
    type: "directory",
    children: [
      {
        id: generateUniqueId(),
        name: "folder 2",
        type: "directory",
        children: [
          {
            id: generateUniqueId(),
            name: "file 5001.pdf",
            type: "file",
          },
          {
            id: generateUniqueId(),
            name: "file 5002.xml",
            type: "file",
          },
        ],
      },
      {
        id: generateUniqueId(),
        name: "file 1002.pdf",
        type: "file",
      },
      {
        id: generateUniqueId(),
        name: "file 1003.pdf",
        type: "file",
      },
    ],
  },
  {
    id: generateUniqueId(),
    name: "folder 2",
    type: "directory",
    children: [],
  },
  {
    id: generateUniqueId(),
    name: "file 15002.xml",
    type: "file",
  },
  {
    id: generateUniqueId(),
    name: "file 15002.xml",
    type: "file",
  },
  {
    id: generateUniqueId(),
    name: "file 15004.xml",
    type: "file",
  },
  {
    id: generateUniqueId(),
    name: "file 15005.xml",
    type: "file",
  },
  {
    id: generateUniqueId(),
    name: "file 15006.docx",
    type: "file",
  },
];
