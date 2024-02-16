import {
  Node,
  NodeType,
  addItem,
  deleteItem,
  editItem,
  findById,
} from "./utils";

test("adds a file to a directory", () => {
  const initialData = [
    {
      type: NodeType.DIRECTORY,
      id: "parent-id",
      name: "Parent",
      children: [],
    },
  ];

  const newNode = {
    type: NodeType.FILE,
    name: "my-file.txt",
  };

  const expectedData = [
    {
      type: NodeType.DIRECTORY,
      id: "parent-id",
      name: "Parent",
      children: [
        {
          type: NodeType.FILE,
          id: expect.any(String),
          name: "my-file.txt",
        },
      ],
    },
  ];

  const result = addItem(initialData)("parent-id", newNode);

  expect(result).toEqual(expectedData);
  expect(result[0].type).toBe(NodeType.DIRECTORY);
  if (result[0].type === NodeType.DIRECTORY) {
    //TS type checking :)
    expect(result[0].children.length).toBe(1);
    expect(result[0].children[0].id).not.toBeNull();
  }
});

test("adds a directory to a directory", () => {
  const initialData = [
    {
      type: NodeType.DIRECTORY,
      id: "parent-id",
      name: "Parent",
      children: [],
    },
  ];

  const newNode = {
    type: NodeType.DIRECTORY,
    name: "new-folder",
  };

  const expectedData = [
    {
      type: NodeType.DIRECTORY,
      id: "parent-id",
      name: "Parent",
      children: [
        {
          type: NodeType.DIRECTORY,
          id: expect.any(String),
          name: "new-folder",
          children: [],
        },
      ],
    },
  ];

  const result = addItem(initialData)("parent-id", newNode);

  expect(result).toEqual(expectedData);
  expect(result[0].type).toBe(NodeType.DIRECTORY);
  if (result[0].type === NodeType.DIRECTORY) {
    //TS type checking :)
    expect(result[0].children.length).toBe(1);
    expect(result[0].children[0].id).not.toBeNull();
  }
});

test("edits a file's name", () => {
  const initialData: Node[] = [
    {
      type: NodeType.FILE,
      id: "file-id",
      name: "old-name.txt",
    },
  ];

  const updatedNode = {
    id: "file-id",
    name: "new-name.txt",
  };

  const expectedData = [
    {
      type: NodeType.FILE,
      id: "file-id",
      name: "new-name.txt",
    },
  ];

  const result = editItem(initialData)(updatedNode);

  expect(result).toEqual(expectedData);
  expect(result[0].name).toBe("new-name.txt");
});

test("deletes a file from a directory", () => {
  const initialData: Node[] = [
    {
      type: NodeType.DIRECTORY,
      id: "parent-id",
      name: "Parent",
      children: [
        {
          type: NodeType.FILE,
          id: "file-to-delete",
          name: "file-to-delete.txt",
        },
      ],
    },
  ];

  const expectedData = [
    {
      type: NodeType.DIRECTORY,
      id: "parent-id",
      name: "Parent",
      children: [],
    },
  ];

  const result = deleteItem(initialData)({ id: "file-to-delete" });

  expect(result).toEqual(expectedData);
  expect(findById(result, "file-to-delete")).toBeUndefined();
});
test("deletes a directory with no children", () => {
  const initialData = [
    {
      type: NodeType.DIRECTORY,
      id: "parent-id",
      name: "Parent",
      children: [
        {
          type: NodeType.DIRECTORY,
          id: "empty-dir",
          name: "Empty Dir",
          children: [],
        },
      ],
    },
  ];

  const expectedData = [
    {
      type: NodeType.DIRECTORY,
      id: "parent-id",
      name: "Parent",
      children: [],
    },
  ];

  const result = deleteItem(initialData)({ id: "empty-dir" });

  expect(result).toEqual(expectedData);
  expect(findById(result, "empty-dir")).toBeUndefined();
});
test("deletes a directory with children", () => {
  const initialData: Node[] = [
    {
      type: NodeType.DIRECTORY,
      id: "parent-id",
      name: "Parent",
      children: [
        {
          type: NodeType.DIRECTORY,
          id: "dir-to-delete",
          name: "Dir to Delete",
          children: [
            {
              type: NodeType.FILE,
              id: "child-file1",
              name: "child-file1.txt",
            },
            {
              type: NodeType.FILE,
              id: "child-file2",
              name: "child-file2.txt",
            },
          ],
        },
      ],
    },
  ];

  const expectedData = [
    {
      type: NodeType.DIRECTORY,
      id: "parent-id",
      name: "Parent",
      children: [],
    },
  ];

  const result = deleteItem(initialData)({ id: "dir-to-delete" });

  expect(result).toEqual(expectedData);
  expect(findById(result, "dir-to-delete")).toBeUndefined();
  expect(findById(result, "child-file1")).toBeUndefined();
  expect(findById(result, "child-file2")).toBeUndefined();
});
test("does not modify data when deleting a non-existent item", () => {
  const initialData = [
    {
      type: NodeType.DIRECTORY,
      id: "parent-id",
      name: "Parent",
      children: [],
    },
  ];

  const result = deleteItem(initialData)({ id: "non-existent" });

  expect(result).toEqual(initialData);
});
