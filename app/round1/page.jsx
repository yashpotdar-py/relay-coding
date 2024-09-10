"use client";

import React, { useEffect, useState } from "react";
import EditorComponent from "@/components/EditorComponent";
import { problemStatements } from "@/config/problemStatements";

const Round1 = () => {
  const [team, setTeam] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60); // 30 minutes in seconds (30 * 60)

  useEffect(() => {
    // Fetch team data from localStorage
    const storedTeamData = JSON.parse(localStorage.getItem("teamData"));
    if (storedTeamData) {
      setTeam(storedTeamData);
    }

    // Start countdown timer
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    // Cleanup on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Format the time left into minutes and seconds
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="p-4 bg-slate-100 dark:bg-slate-800 m-4 rounded-lg">
      {team ? (
        <>
          <h1 className="text-2xl">Welcome, {team.teamName}</h1>
          <p>Team Members: {team.members.join(", ")}</p>
        </>
      ) : (
        <p>Loading team information...</p>
      )}

      {/* Timer Display */}
      <div className="mt-4">
        <h2 className="text-xl mb-6">Time Remaining: {formatTime(timeLeft)}</h2>
      </div>

      {/* Problem and Editor */}
      <EditorComponent problem={problemStatements.round1} />

      {/* When time is up */}
      {timeLeft === 0 && (
        <div className="mt-4 text-red-600">
          <h2>Time&apos;s up! Please submit your solution.</h2>
        </div>
      )}
    </div>
  );
};

export default Round1;
