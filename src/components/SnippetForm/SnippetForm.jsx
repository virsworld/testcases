import React, { useEffect, useRef, useState } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView } from "codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { basicSetup } from "codemirror";
require('dotenv').config();

const SnippetForm = ({ directory, numLabs, onSnippetAdded }) => {
  const [fileName, setFileName] = useState("");
  const [testCaseContent, setTestCaseContent] = useState("");
  const [outputContent, setOutputContent] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [lab, setLab] = useState("");
  const [loading, setLoading] = useState(false);

  const testCaseEditorRef = useRef(null);
  const outputEditorRef = useRef(null);

  const testCaseViewRef = useRef(null);
  const outputViewRef = useRef(null);

  useEffect(() => {
    const initEditor = (editorRef, viewRef, setContent) => {
      if (!editorRef.current) return;

      const updateListener = EditorView.updateListener.of((update) => {
        if (update.changes) {
          setContent(update.state.doc.toString());
        }
      });

      const state = EditorState.create({
        doc: "",
        extensions: [basicSetup, oneDark, updateListener],
      });

      const view = new EditorView({
        state,
        parent: editorRef.current,
      });

      viewRef.current = view;

      return () => view.destroy();
    };

    const testCaseCleanup = initEditor(testCaseEditorRef, testCaseViewRef, setTestCaseContent);
    const outputCleanup = initEditor(outputEditorRef, outputViewRef, setOutputContent);

    return () => {
      testCaseCleanup && testCaseCleanup();
      outputCleanup && outputCleanup();
    };
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    if (!fileName || !testCaseContent || !outputContent || !lab) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const testCaseFilename = `${fileName}_input.txt`;
      const outputFilename = `${fileName}_output.txt`;

      const response = await fetch(`${process.env.SERVER_URL}/api/snippets?directory=${directory}&lab=${lab}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          testCaseFilename,
          testCaseContent,
          expectedOutputFilename: outputFilename,
          expectedOutputContent: outputContent,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("Snippet uploaded successfully.");
        setFileName("");
        setTestCaseContent("");
        setOutputContent("");
        setLab("");
        setError("");
        setLoading(false);

        // Reset CodeMirror editors
        if (testCaseViewRef.current) {
          testCaseViewRef.current.dispatch({
            changes: { from: 0, to: testCaseViewRef.current.state.doc.length, insert: "" },
          });
        }
        if (outputViewRef.current) {
          outputViewRef.current.dispatch({
            changes: { from: 0, to: outputViewRef.current.state.doc.length, insert: "" },
          });
        }

        if (onSnippetAdded) {
          onSnippetAdded({
            testCaseFilename,
            expectedOutputFilename: outputFilename,
            fileName,
            lab,
          });
        }
      console.log(response.status);
      } else if (response.status === 500) {
        setError(`A test case with the name "${fileName}" already exists in ${lab}.`);
        setLoading(false);
      } else {
        const data = await response.json();
        setError(data.message || "Error uploading snippet. A test case with this name might already exist in the lab.");
        setLoading(false);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-secondary rounded-lg shadow-lg border border-primary-light">
      {message && <p className="text-green-600 font-semibold mb-2">{message}</p>}
      {error && <p className="text-red-600 font-semibold mb-2">{error}</p>}
      <form onSubmit={handleUpload} className="flex flex-col gap-6">
        <div>
          <label htmlFor="lab-select" className="text-primary-dark font-medium">
            Select Lab
          </label>
          <select
            id="lab-select"
            value={lab}
            onChange={(e) => setLab(e.target.value)}
            className="mt-2 w-full p-3 border border-primary-dark rounded focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select a Lab</option>
            {[...Array(numLabs).keys()].map((i) => (
              <option key={i} value={`Lab ${i + 1}`}>
                {`Lab ${i + 1}`}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="fileName" className="text-primary-dark font-medium">
            File Name (without extension)
          </label>
          <input
            id="fileName"
            type="text"
            placeholder="Enter file name"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="mt-2 w-full p-3 border border-primary-dark rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label htmlFor="testCase" className="text-primary-dark font-medium">
            Test Case
          </label>
          <div ref={testCaseEditorRef} id="testCase" className="mt-2 border-2 border-primary-dark rounded"></div>
        </div>
        <div>
          <label htmlFor="output" className="text-primary-dark font-medium">
            Expected Output
          </label>
          <div ref={outputEditorRef} id="output" className="mt-2 border-2 border-primary-dark rounded"></div>
        </div>
        <button
          type="submit"
          className={`bg-primary text-white py-2 px-4 rounded shadow-md hover:bg-primary-dark transition duration-300 mt-4 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload Snippet"}
        </button>
      </form>
      {loading && (
        <div className="mt-4 text-center">
          <div className="animate-spin border-4 border-t-4 border-primary rounded-full w-8 h-8 mx-auto"></div>
        </div>
      )}
    </div>
  );
};

export default SnippetForm;