"use client";

import React, { useRef, useState } from "react";
import * as monaco from "monaco-editor";
import { ModeToggleBtn } from "./mode-toggle-btn";
import toast from "react-hot-toast";
import SelectLanguages, {
  selectedLanguageOptionProps,
} from "./SelectLanguages";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Loader, Play, TriangleAlert } from "lucide-react";
import { codeSnippets, languageOptions } from "@/config/config";
import { compileCode } from "../actions/compile";

export default function EditorComponent() {
  const { theme } = useTheme();
  const editorRef = useRef(null);
  const [languageOption, setLanguageOption] = useState(languageOptions[3]);
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState([]);
  const [err, setErr] = useState(false);
  const [sourceCode, setSourceCode] = useState(codeSnippets["python"]);
  // console.log(language);

  function handleEditorDidMount(editor) {
    if (editor) {
      editorRef.current = editor;
      editor.focus();
    }
  }

  function handleOnChange(value) {
    if (value) {
      setSourceCode(value);
    }
  }

  // function onSelect(value: selectedLanguageOptionProps) {
  //   setLanguageOption(value);
  //   setSourceCode(codeSnippets[value.language]);
  // }

  function onSelect(value) {
    const selectedLanguage = value.language;
    setLanguageOption(value);
    setSourceCode(codeSnippets[selectedLanguage]);
  }

  async function executeCode() {
    setLoading(true);
    const requestData = {
      language: languageOption.language,
      version: languageOption.version,
      files: [
        {
          content: sourceCode,
        },
      ],
    };
    try {
      const result = await compileCode(requestData);
      setOutput(result.run.output.split("\n"));
      console.log(result);
      setLoading(false);
      setErr(false);
      toast.success("Compiled Successfully");
    } catch (error) {
      setErr(true);
      setLoading(false);
      toast.error("Failed to compile the Code");
      console.log(error);
    }
  }

  return (
    <>
      <div className="min-h-screen dark:bg-slate-900 bg-slate-300 rounded shadow-2xl py-6 px-8">
        {/* Editor Header */}
        <div className="flex items-center  justify-between ">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0">
            Coding Playground
          </h2>
          {/* Editor Header */}
          <div className="flex items-center space-x-2 pb-3">
            {/* Theme Toggler */}
            <ModeToggleBtn />
            {/* Language Selector */}
            <div className="w-[230px]">
              <SelectLanguages
                onSelect={onSelect}
                selectedLanguageOption={languageOption}
              />
            </div>
          </div>
        </div>
        {/* Editor */}
        <div className="bg-slate-400 dark:bg-slate-950 p-3 rounded">
          <div className="dark:bg-slate-900 bg-slate-300 rounded">
            <ResizablePanelGroup
              direction="horizontal"
              className="rounded-lg border md:min-w-[450px] min-h-lvh w-full"
            >
              <ResizablePanel defaultSize={25} minSize={15}>
                <div className="flex justify-center">
                  <div className="flex p-6 dark:bg-slate-800 bg-slate-400 rounded m-2 w-full items-center justify-center">
                    <h2>Problem Statement</h2>
                  </div>
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={75} minSize={50}>
                <ResizablePanelGroup direction="vertical">
                  <ResizablePanel
                    defaultSize={50}
                    minSize={25}
                    className="m-2 rounded"
                  >
                    {/* <div className="flex h-full items-center justify-center p-6"> */}

                    <Editor
                      theme={theme === "dark" ? "vs-dark" : "vs-light"}
                      height="90vh"
                      defaultLanguage={languageOption.language}
                      defaultValue={sourceCode}
                      onMount={handleEditorDidMount}
                      language={languageOption.language}
                      options={{
                        minimap: {
                          enabled: false,
                        },
                        fontSize: 18,
                        cursorStyle: "line",
                        wordWrap: "on",
                      }}
                      value={sourceCode}
                      onChange={handleOnChange}
                    />
                    {/* </div> */}
                  </ResizablePanel>
                  <ResizableHandle withHandle />
                  <ResizablePanel defaultSize={50} minSize={25} className="">
                    <div className="p-4 bg-white dark:bg-slate-800 m-2 rounded">
                      {/* <span className="font-semibold">Three</span> */}
                      <div className="flex items-center justify-between p-2 dark:bg-slate-800 bg-slate-400 rounded">
                        <h2>Output</h2>
                        {loading ? (
                          <Button
                            disabled
                            size={"sm"}
                            className="dark:bg-purple-600 dark:hover:bg-purple-700 text-slate-100 bg-slate-800 hover:bg-slate-900"
                          >
                            <Loader className="w-4 h-4 mr-2 animate-spin" />
                            <span>Running please wait...</span>
                          </Button>
                        ) : (
                          <Button
                            onClick={executeCode}
                            size={"sm"}
                            className="dark:bg-purple-600 dark:hover:bg-purple-700 text-slate-100 bg-slate-800 hover:bg-slate-900"
                          >
                            <Play className="w-4 h-4 mr-2 " />
                            <span>Run</span>
                          </Button>
                        )}
                      </div>
                      <div className="overflow-hidden">
                        {err ? (
                          <div className="flex items-center space-x-2 border border-red-600 px-6 py-6">
                            <TriangleAlert className="w-5 h-5 mr-2 flex-shrink-0" />
                            <p className="text-xs text-red-500">
                              Failed to Compile the Code , Please try again !
                            </p>
                          </div>
                        ) : (
                          <>
                            <div className="m-2 p-6 bg-slate-400 dark:bg-slate-900 rounded-lg">
                              {output.map((item) => {
                                return (
                                  <p className="text-sm" key={item}>
                                    {item}
                                  </p>
                                );
                              })}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>
      </div>
    </>
  );
}
