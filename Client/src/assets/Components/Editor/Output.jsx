import React, { useState } from "react";
import { executeCode } from "../../../api";
import { VscRunAll } from "react-icons/vsc";

function Output({ editorRef, language }) {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const runCode = async () => {
    // console.log("runcode")
    if (!editorRef.current) return;
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode.trim()) return;

    try {
      // console.log("request");
      setLoading(true);
      const result = await executeCode(language, sourceCode);
      setOutput(result.output || result.stderr || "No output");
    } catch (error) {
      setOutput("Error running code: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      {/* Run button bar */}
      <div className="flex justify-between items-center p-2 border-b border-gray-700">
        <button
          onClick={runCode}
          disabled={loading}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer
            ${
              loading
                ? "bg-blue-500/70 cursor-not-allowed text-white"
                : "bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 active:scale-95 text-white shadow-md hover:shadow-lg"
            }
          `}
        >
          {loading ? (
            <span className="animate-pulse">⚡ Running...</span>
          ) : (
            <>
              <VscRunAll className="text-lg" />
              <span>Run Code</span>
            </>
          )}
        </button>
      </div>

      {/* Output console */}
      
      <div className="flex-1 overflow-auto bg-black p-3 font-mono text-sm whitespace-pre-wrap">
        <h3 className="font-semibold mb-2">Output:</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
}

export default Output;
