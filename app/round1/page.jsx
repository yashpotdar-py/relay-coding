"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import EditorComponent from "@/components/EditorComponent"; // Assuming you're importing this
import toast from "react-hot-toast";

// Sample problem statement for round 1
const problem = {
  title: "Example Problem",
  description: "Write a function to reverse a string.",
};

export default function Round1() {
  const [timeLeft, setTimeLeft] = useState(300); // Timer set to 5 minutes (300 seconds)
  const [sourceCode, setSourceCode] = useState("// Write your code here");
  const [output, setOutput] = useState([]);
  const timerRef = useRef(null);

  // Function to download code and output after the timer runs out
  const downloadFile = useCallback(() => {
    const fileName = `team_solution_round1.txt`;
    const fileContent = `Problem: ${
      problem.title
    }\n\nCode:\n${sourceCode}\n\nOutput:\n${output.join("\n")}`;

    const blob = new Blob([fileContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Code and Output downloaded successfully!");
  }, [sourceCode, output]);

  // Function to start the countdown
  useEffect(() => {
    if (timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(timeLeft - 1), 30);
    } else {
      clearTimeout(timerRef.current);
      // When the timer runs out, trigger the submission/download
      downloadFile();
    }

    return () => clearTimeout(timerRef.current);
  }, [timeLeft, downloadFile]);

  // Function to submit manually (optional)
  function submitManually() {
    downloadFile();
  }

  return (
    <div className="min-h-screen dark:bg-slate-900 bg-slate-300 rounded-lg shadow-2xl py-6 px-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">Round 1</h2>
        {/* Timer */}
        <div className="text-lg">
          Time Left: {Math.floor(timeLeft / 60)}:
          {("0" + (timeLeft % 60)).slice(-2)}
        </div>
        {/* Manual submit button (optional) */}
        <button
          onClick={submitManually}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit Manually
        </button>
      </div>

      {/* Problem Statement and Editor */}
      <div className="my-4">
        <EditorComponent problem={problem} />
      </div>
    </div>
  );
}
