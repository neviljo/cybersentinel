import { ArrowLeft, Phone, Video, ChevronLeft, Plus, Send} from "lucide-react";
import { useEffect, useRef, useState } from 'react';
import MobileFrameWrapper from "./MobileFrameWrapper";

export default function SmsPhishingSimulation() {
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState('');
  const [isEvaluated, setIsEvaluated] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chat]);

  useEffect(() => {
    const loadInitialMessage = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:4000/api/get-sms-phish", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chatHistory: [{ role: 'assistant', content: 'start' }],
          }),
        });

        const data = await res.json();
        setChat([{ role: 'assistant', content: data.message }]);
      } catch (err) {
        alert("❌ Failed to load initial message.");
      } finally {
        setLoading(false);
      }
    };

    loadInitialMessage();
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const newChat = [...chat, { role: 'user', content: input.trim() }];
    setChat(newChat);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/get-sms-phish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatHistory: newChat }),
      });

      const data = await res.json();
      setChat([...newChat, { role: 'assistant', content: data.message }]);
    } catch (err) {
      alert("❌ Failed to get attacker message.");
    } finally {
      setLoading(false);
    }
  };

  const evaluateChat = async () => {
    if (chat.length < 2) {
      alert("Chat too short to evaluate.");
      return;
    }

    const prompt = `
This is a simulated SMS chat between a cyber attacker and a victim:
${chat.map(msg => `${msg.role === 'user' ? 'Victim' : 'Attacker'}: ${msg.content}`).join('\n')}

Evaluate how the victim (user) responded. Did they fall for the scam?

Format output with plain text headings in uppercase like "SUMMARY ANALYSIS", "DO'S", "DON'TS".
Use hyphens (-) for bullet points. Do NOT use stars (*), hashes (#), or markdown.
Return clean, readable output for a UI.
`.trim();

    setLoading(true);
    try {
      const res = await fetch("https://api.magicapi.dev/api/v1/swift-api/gpt-3-5-turbo/chat/completions", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-magicapi-key': import.meta.env.VITE_MAGIC_API_KEY,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
        }),
      });

      const data = await res.json();
      const parsed = parseEvaluation(data.choices?.[0]?.message?.content || 'No evaluation available.');
      setEvaluation(parsed);
      setIsEvaluated(true);
    } catch (error) {
      alert("❌ Evaluation failed.");
    } finally {
      setLoading(false);
    }
  };

  const parseEvaluation = (text) => {
    const lines = text.split('\n').filter(Boolean);
    const elements = [];
    let currentList = [];

    lines.forEach((line, idx) => {
      const headingMatch = line.match(/^([A-Z ]{3,})$/);
      const bulletMatch = line.match(/^- (.+)/);

      if (headingMatch) {
        if (currentList.length) {
          elements.push(<ul key={`ul-${idx}`} className="list-disc ml-5 mb-4">{currentList}</ul>);
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
          elements.push(<ul key={`ul-${idx}`} className="list-disc ml-5 mb-4">{currentList}</ul>);
          currentList = [];
        }
        elements.push(<p key={`p-${idx}`} className="mb-3">{line}</p>);
      }
    });

    if (currentList.length) {
      elements.push(<ul key="ul-last" className="list-disc ml-5 mb-4">{currentList}</ul>);
    }

    return elements;
  };

  return (<MobileFrameWrapper>
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
    <header className="h-12 bg-white text-gray-800 px-4 flex items-center justify-between border-b border-gray-200 sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <ChevronLeft />

            <span className="font-semibold text-md">+91 9856444390</span>
          </div>
        
 </header>

      <div
        className="h-80 overflow-y-scroll border p-3 rounded mb-4 bg-gray-50"
        ref={chatRef}
      >
        {chat.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span
              className={`inline-block px-4 py-2 rounded-lg max-w-xs break-words ${
                msg.role === 'user' ? 'bg-blue-200' : 'bg-green-100'
              }`}
            >
              {msg.content}
            </span>
          </div>
        ))}
      </div>

      {!isEvaluated ? (
        <>
          <footer className="bg-white px-3 py-2 border-t mb-2 flex items-center gap-2">
          {/* Plus icon for file upload */}
          <label className="cursor-pointer text-gray-600">
            <Plus size={22} />
            <input type="file" className="hidden" />
          </label>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1 px-4 py-2 rounded-full bg-gray-100 text-sm focus:outline-none"
              placeholder="Type your SMS reply..."
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              <Send size={16} />
            </button>
          </footer>

          <button
            onClick={evaluateChat}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            disabled={loading}
          >
            End & Evaluate
          </button>
        </>
      ) : (
        <div className="mt-4 p-4 bg-yellow-100 rounded text-sm leading-relaxed">
          {evaluation}
        </div>
      )}
    </div>
    </MobileFrameWrapper>
  );
}



