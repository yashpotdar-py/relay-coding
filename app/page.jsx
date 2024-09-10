"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (teamName === "" || members === "") {
      setError("Please provide all the details");
      return;
    }

    // Prepare data to store
    const teamData = {
      teamName,
      members: members.split(",").map((member) => member.trim()), // Split members by comma
    };

    // Store in localStorage (since event is offline)
    localStorage.setItem("teamData", JSON.stringify(teamData));

    // Redirect to Round 1
    router.push("/round1");
  };

  return (
    <div className="min-h-screen dark:bg-slate-800 light:bg-slate-300 p-8 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Register Your Team</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="teamName"
            className="block text-sm font-medium text-gray-700"
          >
            Team Name
          </label>
          <input
            type="text"
            id="teamName"
            className="mt-1 block w-full p-2 border rounded"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="members"
            className="block text-sm font-medium text-gray-700"
          >
            Team Members (comma separated)
          </label>
          <input
            type="text"
            id="members"
            className="mt-1 block w-full p-2 border rounded"
            value={members}
            onChange={(e) => setMembers(e.target.value)}
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Register and Start Round 1
        </button>
      </form>
    </div>
  );
}
