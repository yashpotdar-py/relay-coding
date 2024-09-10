import EditorComponent from "@/components/EditorComponent";
import { problemStatements } from "@/config/problemStatements";

const Round1 = () => {
  const problem = problemStatements.round1;
  return <EditorComponent problem={problem}/>;
};

export default Round1;
