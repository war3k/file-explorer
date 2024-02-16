export enum NodeType {
  FILE = "file",
  DIRECTORY = "directory",
}

export type Node =
  | {
      type: NodeType.FILE;
      name: string;
      id: string;
    }
  | {
      type: NodeType.DIRECTORY;
      name: string;
      id: string;
      children: Node[] | [];
    };

export function generateUniqueId(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
