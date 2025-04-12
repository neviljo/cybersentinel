import { useState } from "react";

export default function PasswordStrengthChecker() {
  const [password, setPassword] = useState("");
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!password.trim()) return alert("Please enter a password to check.");
    setLoading(true);
    setEvaluation(null);

    try {
      const res = await fetch("http://localhost:4000/api/check-password-strength", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      const parsed = parseEvaluation(data.evaluation || "No response.");
      setEvaluation(parsed);
    } catch (err) {
      alert("❌ Failed to evaluate password.");
    } finally {
      setLoading(false);
    }
  };

  // Parse evaluation into JSX with bold section headers and bullet points
  const parseEvaluation = (text) => {
    const lines = text.split("\n").filter(Boolean);
    const elements = [];
    let currentList = [];

    lines.forEach((line, idx) => {
      const headingMatch = line.match(/^([A-Z ]{3,})$/);
      const bulletMatch = line.match(/^- (.+)/);

      if (headingMatch) {
        if (currentList.length) {
          elements.push(<ul key={`ul-${idx}`} className="list-disc ml-6 mb-4">{currentList}</ul>);
          currentList = [];
        }
        elements.push(
          <h3 key={`h-${idx}`} className="text-lg font-bold mt-4 mb-2">
            {headingMatch[1]}
          </h3>
        );
      } else if (bulletMatch) {
        currentList.push(<li key={`li-${idx}`}>{bulletMatch[1]}</li>);
      } else {
        if (currentList.length) {
          elements.push(<ul key={`ul-${idx}`} className="list-disc ml-6 mb-4">{currentList}</ul>);
          currentList = [];
        }
        elements.push(<p key={`p-${idx}`} className="mb-3">{line}</p>);
      }
    });

    if (currentList.length) {
      elements.push(<ul key="ul-last" className="list-disc ml-6 mb-4">{currentList}</ul>);
    }

    return elements;
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">🔐 Password Strength Checker</h2>

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border px-4 py-2 rounded mb-4"
        placeholder="Enter your password"
      />

      <button
        onClick={handleCheck}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        {loading ? "Checking..." : "Check Password Strength"}
      </button>

      {evaluation && (
        <div className="mt-6 bg-yellow-100 p-4 rounded leading-relaxed text-sm">
          {evaluation}
        </div>
      )}
    </div>
  );
}
