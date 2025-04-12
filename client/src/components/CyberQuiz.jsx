import { useEffect, useState } from "react";
import MobileFrameWrapper from "./MobileFrameWrapper";

export default function CyberSafetyQuiz() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:4000/api/get-quiz");
      if (!res.ok) throw new Error("Failed to fetch quiz from server");
      const data = await res.json();
      setQuestions(data.questions);
    } catch (err) {
      setError("Error fetching questions. Please check your backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleSelect = (index) => setSelected(index);

  const handleNext = () => {
    if (selected === questions[current].answerIndex) setScore(score + 1);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      setShowResult(true);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-blue-100 flex items-center justify-center">
        <div className="text-xl text-blue-600 animate-pulse font-semibold">
          Loading quiz...
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-blue-100 flex items-center justify-center">
        <div className="text-center max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
          <p className="text-red-500 text-lg font-semibold mb-4">{error}</p>
          <button
            onClick={fetchQuestions}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow"
          >
            Retry
          </button>
        </div>
      </div>
    );

  if (!questions.length)
    return (
      <div className="min-h-screen bg-blue-100 flex items-center justify-center">
        <div className="text-center text-gray-600 text-xl">
          No questions available.
        </div>
      </div>
    );

  return (
    <MobileFrameWrapper>
    <div className="min-h-screen bg-blue-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full p-6 bg-white rounded-2xl shadow-xl">
        {!showResult ? (
          <>
            <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
              Cyber Safety Quiz
            </h1>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Question {current + 1}</span>
                <span>Total: {questions.length}</span>
              </div>

              <p className="text-lg font-medium">{questions[current].question}</p>

              <div className="space-y-3">
                {questions[current].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelect(index)}
                    className={`w-full px-5 py-3 rounded-lg text-left font-semibold transition ${
                      selected === index
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-800 hover:bg-blue-100"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={selected === null}
                className="mt-4 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg disabled:opacity-50 w-full"
              >
                {current + 1 === questions.length ? "Finish" : "Next"}
              </button>
            </div>
          </>
        ) : (
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-green-700">🎉 Quiz Complete!</h2>
            <p className="text-lg text-gray-700">
              You scored <span className="font-bold text-black">{score}</span> out of{" "}
              <span className="font-bold text-black">{questions.length}</span>
            </p>
            <button
              onClick={() => {
                setCurrent(0);
                setSelected(null);
                setScore(0);
                setShowResult(false);
                fetchQuestions();
              }}
              className="bg-blue-600 hover:bg-blue-700 text-black px-6 py-3 font-semibold rounded-lg"
            >
              Restart Quiz
            </button>
          </div>
        )}
      </div>
    </div></MobileFrameWrapper>
  );
}
