import React, { useEffect, useState, useRef } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { oneDark } from "@codemirror/theme-one-dark";
import { basicSetup } from "codemirror";

const SnippetViewer = ({ testCase, expectedOutput, directory, uploader, name }) => {
  const [testCaseContent, setTestCaseContent] = useState("");
  const [expectedOutputContent, setExpectedOutputContent] = useState("");
  const [error, setError] = useState("");
  const testCaseEditorRef = useRef(null);
  const expectedOutputEditorRef = useRef(null);


  const fetchSnippetContent = async (filename, setContent) => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/snippets?directory=${directory}&filename=${filename}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch ${filename}: ${response.statusText}`);
      }
      const data = await response.json();
      setContent(data.content);
    } catch (err) {
      console.error(err);
      setError(`Error fetching content: ${err.message}`);
    }
  };

  useEffect(() => {
    if (testCase) fetchSnippetContent(testCase.name, setTestCaseContent);
    if (expectedOutput) fetchSnippetContent(expectedOutput.name, setExpectedOutputContent);
  }, [testCase, expectedOutput, directory]);

  const initializeEditor = (editorRef, content) => {
    if (!editorRef.current || content === null) return;

    const state = EditorState.create({
      doc: content,
      extensions: [basicSetup, oneDark, EditorView.editable.of(false)],
    });

    const view = new EditorView({
      state,
      parent: editorRef.current,
    });

    return () => view.destroy();
  };

  useEffect(() => initializeEditor(testCaseEditorRef, testCaseContent), [testCaseContent]);
  useEffect(() => initializeEditor(expectedOutputEditorRef, expectedOutputContent), [expectedOutputContent]);

  return (
    <div className="p-4 bg-secondary rounded-lg shadow-md">
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <h3 className="text-md text-gray-700 font-semibold mb-2">
        {name || "Unnamed"}
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-primary font-bold mb-2">Test Case</h4>
          <div
            ref={testCaseEditorRef}
            className="rounded max-h-96 overflow-auto bg-white p-2"
          ></div>
        </div>
        <div>
          <h4 className="text-primary font-bold mb-2">Expected Output</h4>
          <div
            ref={expectedOutputEditorRef}
            className="rounded max-h-96 overflow-auto bg-white p-2"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SnippetViewer;