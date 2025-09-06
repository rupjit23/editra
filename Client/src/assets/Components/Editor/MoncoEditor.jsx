

import React, { useRef, useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { Languageversion } from "../../../LanguageVersions";
import Output from "./Output";
import toast, { Toaster } from "react-hot-toast";
import { supabase } from "../../../createClient";
import { CiSaveDown1 } from "react-icons/ci";
import { LuSave } from "react-icons/lu";

const ACTIONS = {
  JOIN: "join",
  JOINED: "joined",
  DISCONNECTED: "disconnected",
  CODE_CHANGE: "code-change",
  SYNC_CODE: "sync-code",
  LEAVE: "leave",
  CODE_OUTPUT: "code-output",
  RUN_CODE: "run-code",
  LANGUAGE_CHANGE: "language-change",
};

function MoncoEditor({ socketRef, roomId, onCodeChange }) {
  const editorRef = useRef();
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [value, setValue] = useState(Languageversion["javascript"].snippet);
  const [outputHeight, setOutputHeight] = useState(200);
  const [isDragging, setIsDragging] = useState(false);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileName, setFileName] = useState("");

  // Current Supabase user
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setCurrentUser(user);
    };
    getUser();
  }, []);

  //  Place cursor at end
  const placeCursorAtEnd = (editor) => {
    const model = editor.getModel();
    if (model) {
      const lastLine = model.getLineCount();
      const lastColumn = model.getLineMaxColumn(lastLine);
      editor.setPosition({ lineNumber: lastLine, column: lastColumn });
    }
  };

  //  On editor mount
  const onMount = (editor) => {
    editorRef.current = editor;
    placeCursorAtEnd(editor);
    editor.focus();

    editor.onDidChangeModelContent(() => {
      const code = editor.getValue();
      socketRef.current?.emit(ACTIONS.CODE_CHANGE, { roomId, code });
      onCodeChange?.(code);
      setValue(code);
    });
  };

  //  Language change
  const onSelect = (lang) => {
    setSelectedLanguage(lang);
    socketRef.current?.emit(ACTIONS.LANGUAGE_CHANGE, { roomId, language: lang });

    const snippet = Languageversion[lang].snippet;
    setValue(snippet);
    editorRef.current?.setValue(snippet);

    setTimeout(() => {
      placeCursorAtEnd(editorRef.current);
      editorRef.current.focus();
    }, 0);
  };

//  Save button click
const handleSaveClick = () => {
  if (!currentUser) {
    toast.error("Please login to save your code");
    return;
  }
  setIsModalOpen(true);
};

//  Submit save to Supabase
const handleSaveSubmit = async () => {
  if (!currentUser) {
    toast.error("Unauthorized: Please login first");
    return;
  }

  if (!fileName.trim()) {
    toast.error("File name is required");
    return;
  }

  try {
    const { error } = await supabase.from("codes").insert([
      {
        user_id: currentUser.id,
        email: currentUser.email,
        username: currentUser.user_metadata?.username || "Anonymous",
        title: fileName,
        code: value,
        language: selectedLanguage,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) throw error;

    toast.success("Code saved successfully");
    setIsModalOpen(false);
    setFileName("");
  } catch (err) {
    console.error(err);
    toast.error("Error saving code");
  }
};


  //  Socket listeners
  useEffect(() => {
    if (!socketRef.current) return;

    const handleCodeChange = ({ code }) => {
      if (editorRef.current && code !== editorRef.current.getValue()) {
        editorRef.current.setValue(code);
        setValue(code);
        onCodeChange?.(code);
      }
    };

    const handleLanguageChange = ({ language }) => {
      setSelectedLanguage(language);
      const snippet = Languageversion[language].snippet;
      setValue(snippet);
      editorRef.current?.setValue(snippet);
      setTimeout(() => {
        placeCursorAtEnd(editorRef.current);
        editorRef.current.focus();
      }, 0);
    };

    socketRef.current.on(ACTIONS.CODE_CHANGE, handleCodeChange);
    socketRef.current.on(ACTIONS.LANGUAGE_CHANGE, handleLanguageChange);

    return () => {
      socketRef.current?.off(ACTIONS.CODE_CHANGE, handleCodeChange);
      socketRef.current?.off(ACTIONS.LANGUAGE_CHANGE, handleLanguageChange);
    };
  }, [socketRef, onCodeChange]);

  //  Dragging logic
  const startDrag = () => setIsDragging(true);
  const stopDrag = () => setIsDragging(false);

  const onDrag = (e) => {
    if (!isDragging) return;
    const newHeight = window.innerHeight - e.clientY;
    if (newHeight > 100 && newHeight < window.innerHeight - 100) {
      setOutputHeight(newHeight);
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", onDrag);
    window.addEventListener("mouseup", stopDrag);
    return () => {
      window.removeEventListener("mousemove", onDrag);
      window.removeEventListener("mouseup", stopDrag);
    };
  }, [isDragging]);

  return (
    <div className="h-screen flex flex-col bg-gray-900 relative">
      <Toaster />

      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-2">
        <LanguageSelector
          selectedLanguage={selectedLanguage}
          onSelect={onSelect}
        />
        
      <button
  onClick={handleSaveClick}
  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg shadow cursor-pointer text-white"
>
  <CiSaveDown1 className="text-xl" />
  Save
</button>

      </div>

      {/* Editor */}
      <div
        className="rounded-2xl overflow-hidden shadow-xl border border-white/10"
        style={{ height: `calc(100% - ${outputHeight}px)` }}
      >
        <Editor
          language={selectedLanguage}
          theme="vs-dark"
          value={value}
          onMount={onMount}
          options={{
            minimap: { enabled: false },
            scrollbar: { verticalScrollbarSize: 6, horizontalScrollbarSize: 6 },
            roundedSelection: true,
            padding: { top: 20, bottom: 20 },
          }}
        />
      </div>

      {/* Drag Handle */}
      <div
        className="h-2 bg-gray-700 cursor-row-resize"
        onMouseDown={startDrag}
      ></div>

      {/* Output */}
      <div style={{ height: `${outputHeight}px` }}>
        <Output editorRef={editorRef} language={selectedLanguage} />
      </div>

      {/* Save Modal */}
    {isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-[1px] z-50">
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 rounded-2xl w-96 shadow-2xl border border-white/10 relative">
      
      {/* Close (X) */}
      <button
        onClick={() => setIsModalOpen(false)}
        className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl cursor-pointer"
      >
        ✕
      </button>

      {/* Title */}
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-blue-800/20 rounded-lg">
          <CiSaveDown1 className="text-blue-300 text-2xl" />
        </div>
        <h2 className="text-xl font-semibold text-white">Save Code</h2>
      </div>

      {/* Input */}
      <input
        type="text"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        placeholder="Enter file name..."
        className="w-full px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
      />

      {/* Submit Button */}
      <button
        onClick={handleSaveSubmit}
        className="w-full flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-700 px-4 py-3 rounded-lg text-white font-medium shadow-lg shadow-blue-600/30 transition-all duration-200 cursor-pointer"
      >
        <LuSave className="text-xl" />
        Save File
      </button>
    </div>
  </div>
)}


    </div>
  );
}

export default MoncoEditor;





