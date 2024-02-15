export type FileNode =
  | {
      type: "file";
      name: string;
      id: string;
    }
  | {
      type: "directory";
      name: string;
      id: string;
      children: FileNode[] | [];
    };

// Unique ID generation (replace with your preferred implementation)
export function generateUniqueId(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
