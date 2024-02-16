import { fireEvent, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FileList } from "./FileList";
import { Node, NodeType } from "../utils";

const mockFn = jest.fn();
const sampleFiles: Node[] = [
  { type: NodeType.FILE, name: "file1.txt", id: "1" },
  {
    type: NodeType.DIRECTORY,
    name: "Documents",
    id: "2",
    children: [
      { type: NodeType.FILE, name: "doc1.pdf", id: "3" },
      { type: NodeType.FILE, name: "doc2.docx", id: "4" },
    ],
  },
];

test("renders list items for files and directories", () => {
  const { getByText, getByTestId } = render(
    <FileList
      items={sampleFiles}
      testId="file-tree"
      addNode={mockFn}
      editNode={mockFn}
      deleteNode={mockFn}
    />
  );

  expect(getByTestId("file-tree")).toBeInTheDocument();
  expect(getByText("file1.txt")).toBeInTheDocument();
});

test("open and close collapse after click", async () => {
  const { queryByText, getByRole } = render(
    <FileList
      items={sampleFiles}
      testId="file-tree"
      addNode={mockFn}
      editNode={mockFn}
      deleteNode={mockFn}
    />
  );
  const folder = getByRole("button", { name: /Documents/i });
  expect(folder).toBeInTheDocument();
  await userEvent.click(folder);
  expect(queryByText("doc1.pdf")).toBeInTheDocument();
  expect(queryByText("doc2.docx")).toBeInTheDocument();
  await userEvent.click(folder);
  expect(queryByText("doc1.pdf")).not.toBeInTheDocument();
  expect(queryByText("doc2.docx")).not.toBeInTheDocument();
});
