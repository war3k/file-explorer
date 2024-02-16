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
      children: Node[];
    };

export function generateUniqueId(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function findById(
  collection: Node[],
  lookedId: string
): Node | undefined {
  for (const o of collection) {
    for (const [k, v] of Object.entries(o)) {
      if (k === "id" && v === lookedId) {
        return o;
      }
      if (Array.isArray(v)) {
        const _o: Node | undefined = findById(v, lookedId);
        if (_o) {
          return _o;
        }
      }
    }
  }
}
function deleteById(collection: Node[], lookedId: string): void {
  for (const key in collection) {
    for (const [k, v] of Object.entries(collection[key])) {
      if (k === "id" && v === lookedId) {
        collection.splice(Number(key), 1);
      }
      if (Array.isArray(v)) {
        deleteById(v, lookedId);
      }
    }
  }
}

export const addItem =
  (data: Node[]) =>
  (parentId: string, node: Omit<Node, "id">): Node[] => {
    const parent = findById(data, parentId);
    let newNode: Node =
      node.type === NodeType.DIRECTORY
        ? {
            name: node.name,
            type: node.type,
            id: generateUniqueId(),
            children: [],
          }
        : {
            name: node.name,
            type: node.type,
            id: generateUniqueId(),
          };
    if (parent && parent.type === NodeType.DIRECTORY) {
      parent.children.push(newNode);
    }
    return data;
  };

export const editItem =
  (data: Node[]) =>
  (node: Pick<Node, "id" | "name">): Node[] => {
    const object = findById(data, node.id);
    if (object) {
      object.name = node.name;
    }
    return data;
  };

export const deleteItem =
  (data: Node[]) =>
  (node: Pick<Node, "id">): Node[] => {
    deleteById(data, node.id);
    return data;
  };
