import { Node, NodeType, generateUniqueId } from "./app/utils";

export const data: Node[] = [
  {
    id: generateUniqueId(),
    name: "folder 1",
    type: NodeType.DIRECTORY,
    children: [
      {
        id: generateUniqueId(),
        name: "folder 2",
        type: NodeType.DIRECTORY,
        children: [
          {
            id: generateUniqueId(),
            name: "file 5001.pdf",
            type: NodeType.FILE,
          },
          {
            id: generateUniqueId(),
            name: "file 5002.xml",
            type: NodeType.FILE,
          },
        ],
      },
      {
        id: generateUniqueId(),
        name: "file 1002.pdf",
        type: NodeType.FILE,
      },
      {
        id: generateUniqueId(),
        name: "file 1003.pdf",
        type: NodeType.FILE,
      },
    ],
  },
  {
    id: generateUniqueId(),
    name: "folder 2",
    type: NodeType.DIRECTORY,
    children: [],
  },
  {
    id: generateUniqueId(),
    name: "file 15002.xml",
    type: NodeType.FILE,
  },
  {
    id: generateUniqueId(),
    name: "file 15002.xml",
    type: NodeType.FILE,
  },
  {
    id: generateUniqueId(),
    name: "file 15004.xml",
    type: NodeType.FILE,
  },
  {
    id: generateUniqueId(),
    name: "file 15005.xml",
    type: NodeType.FILE,
  },
  {
    id: generateUniqueId(),
    name: "file 15006.docx",
    type: NodeType.FILE,
  },
];
