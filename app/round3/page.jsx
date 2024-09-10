import React from "react";
import EditorComponent from "@/components/EditorComponent";
import { problemStatements } from "@/config/problemStatements";

const Round1 = () => {
  const problem = problemStatements.round3; // Fetch the specific problem for Round 1
  return <EditorComponent problem={problem} />;
};

export default Round1;
