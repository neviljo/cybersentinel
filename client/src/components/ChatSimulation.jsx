


// import { useEffect, useRef, useState } from 'react';

// export default function ChatSimulation() {
//   const [chat, setChat] = useState([]);
//   const [input, setInput] = useState('');
//   const [isEvaluated, setIsEvaluated] = useState(false);
//   const [evaluation, setEvaluation] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const chatRef = useRef(null);

//   // Scroll to bottom whenever chat updates
//   useEffect(() => {
//     if (chatRef.current) {
//       chatRef.current.scrollTop = chatRef.current.scrollHeight;
//     }
//   }, [chat]);

//   // Load initial attacker message
//   useEffect(() => {
//     const loadInitialMessage = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch("http://localhost:4000/api/get-next-message", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             chatHistory: [{ role: 'assistant', content: 'start' }],
//           }),
//         });

//         const data = await res.json();
//         setChat([{ role: 'assistant', content: data.message }]);
//       } catch (err) {
//         alert("❌ Failed to load initial message.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadInitialMessage();
//   }, []);

//   const sendMessage = async () => {
//     if (!input.trim() || loading) return;

//     const newChat = [...chat, { role: 'user', content: input.trim() }];
//     setChat(newChat);
//     setInput('');
//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:4000/api/get-next-message", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ chatHistory: newChat }),
//       });

//       const data = await res.json();
//       setChat([...newChat, { role: 'assistant', content: data.message }]);
//     } catch (err) {
//       alert("❌ Failed to get attacker message.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const evaluateChat = async () => {
//     if (chat.length < 2) {
//       alert("Chat too short to evaluate.");
//       return;
//     }

//     const prompt = `
// This is a simulated chat between a cyber attacker and a victim:
// ${chat.map(msg => `${msg.role === 'user' ? 'Victim' : 'Attacker'}: ${msg.content}`).join('\n')}

// Evaluate how the victim (user) responded. Did they fall for the scam?

// Return the result with the following format:
// - All headings should be in plain text with uppercase and surrounded by two asterisks, like **SUMMARY ANALYSIS**, **DO'S**, **DON'TS**.
// - Use hyphens (-) for bullet points. Do NOT use asterisks (*) or hashtags (#) for formatting.
// - Write in clear, concise, readable language with proper line spacing between sections.
// - Avoid wrapping the entire result in code blocks or markdown syntax.
//     `.trim();

//     setLoading(true);
//     try {
//       const res = await fetch("https://api.magicapi.dev/api/v1/swift-api/gpt-3-5-turbo/chat/completions", {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'x-magicapi-key': import.meta.env.VITE_MAGIC_API_KEY,
//         },
//         body: JSON.stringify({
//           model: 'gpt-3.5-turbo',
//           messages: [{ role: 'user', content: prompt }],
//         }),
//       });

//       const data = await res.json();
//       const parsed = parseEvaluation(data.choices?.[0]?.message?.content || 'No evaluation available.');
//       setEvaluation(parsed);
//       setIsEvaluated(true);
//     } catch (error) {
//       alert("❌ Evaluation failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Evaluation text => JSX
//   const parseEvaluation = (text) => {
//     const lines = text.split('\n').filter(Boolean);
//     const elements = [];
//     let currentList = [];

//     lines.forEach((line, idx) => {
//       const headingMatch = line.match(/^\*\*(.+?)\*\*$/);
//       const bulletMatch = line.match(/^- (.+)/);

//       if (headingMatch) {
//         if (currentList.length) {
//           elements.push(<ul key={`ul-${idx}`} className="list-disc ml-5 mb-4">{currentList}</ul>);
//           currentList = [];
//         }
//         elements.push(
//           <h3 key={`h-${idx}`} className="text-lg font-semibold mt-4 mb-2">
//             {headingMatch[1]}
//           </h3>
//         );
//       } else if (bulletMatch) {
//         currentList.push(<li key={`li-${idx}`}>{bulletMatch[1]}</li>);
//       } else {
//         if (currentList.length) {
//           elements.push(<ul key={`ul-${idx}`} className="list-disc ml-5 mb-4">{currentList}</ul>);
//           currentList = [];
//         }
//         elements.push(<p key={`p-${idx}`} className="mb-3">{line}</p>);
//       }
//     });

//     if (currentList.length) {
//       elements.push(<ul key="ul-last" className="list-disc ml-5 mb-4">{currentList}</ul>);
//     }

//     return elements;
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
//       <h2 className="text-2xl font-bold mb-4 text-center">💬 WhatsApp Scam Simulation</h2>

//       <div
//         className="h-80 overflow-y-scroll border p-3 rounded mb-4 bg-gray-50"
//         ref={chatRef}
//       >
//         {chat.map((msg, idx) => (
//           <div key={idx} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
//             <span
//               className={`inline-block px-4 py-2 rounded-lg max-w-xs break-words ${
//                 msg.role === 'user' ? 'bg-blue-200' : 'bg-green-100'
//               }`}
//             >
//               {msg.content}
//             </span>
//           </div>
//         ))}
//       </div>

//       {!isEvaluated ? (
//         <>
//           <div className="flex gap-2">
//             <input
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
//               className="flex-1 border px-3 py-2 rounded"
//               placeholder="Type your response..."
//               disabled={loading}
//             />
//             <button
//               onClick={sendMessage}
//               disabled={loading}
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             >
//               {loading ? 'Sending...' : 'Send'}
//             </button>
//           </div>

//           <button
//             onClick={evaluateChat}
//             className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//             disabled={loading}
//           >
//             End & Evaluate
//           </button>
//         </>
//       ) : (
//         <div className="mt-4 p-4 bg-yellow-100 rounded text-sm leading-relaxed">
//           {evaluation}
//         </div>
//       )}
//     </div>
//   );
// }

import { useEffect, useRef, useState } from 'react';
import MobileFrameWrapper from './MobileFrameWrapper';
import { BatteryFull, ChevronLeft, Signal, Wifi, Smile , Mic, Paperclip, Camera} from 'lucide-react';


export default function ChatSimulation() {
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
        const res = await fetch("http://localhost:4000/api/get-next-message", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chatHistory: [{ role: 'assistant', content: 'start' }],
          }),
        });

        const data = await res.json();
        setChat([{
          role: 'assistant',
          content: data.message,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      } catch {
        alert("❌ Failed to load initial message.");
      } finally {
        setLoading(false);
      }
    };

    loadInitialMessage();
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newChat = [...chat, { role: 'user', content: input.trim(), time: now }];
    setChat(newChat);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/get-next-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatHistory: newChat }),
      });

      const data = await res.json();
      setChat([
        ...newChat,
        {
          role: 'assistant',
          content: data.message,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch {
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
This is a simulated chat between a cyber attacker and a victim:
${chat.map(msg => `${msg.role === 'user' ? 'Victim' : 'Attacker'}: ${msg.content}`).join('\n')}

Evaluate how the victim (user) responded. Did they fall for the scam?

Return the result with the following format:
- All headings should be in plain text with uppercase and surrounded by two asterisks, like **SUMMARY ANALYSIS**, **DO'S**, **DON'TS**.
- Use hyphens (-) for bullet points. Do NOT use asterisks (*) or hashtags (#) for formatting.
- Write in clear, concise, readable language with proper line spacing between sections.
- Avoid wrapping the entire result in code blocks or markdown syntax.
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
    } catch {
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
      const headingMatch = line.match(/^\*\*(.+?)\*\*$/);
      const bulletMatch = line.match(/^- (.+)/);

      if (headingMatch) {
        if (currentList.length) {
          elements.push(<ul key={`ul-${idx}`} className="list-disc ml-5 mb-4">{currentList}</ul>);
          currentList = [];
        }
        elements.push(
          <h3 key={`h-${idx}`} className="text-lg font-semibold mt-4 mb-2">
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

  return (
   
     <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-[390px] h-[844px] bg-black rounded-[2.8rem] shadow-[inset_0_0_10px_rgba(0,0,0,0.4)] p-[6px] border-[8px] border-neutral-700 relative flex flex-col">
        <div className="flex-1 bg-white rounded-[2rem] overflow-hidden relative flex flex-col">

          {/* Status Bar */}
          <div className="h-7 w-full flex items-center justify-between px-6 pt-1 text-[13px] text-white font-medium bg-[#128C7E] z-10 relative">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <Signal size={18} />
              <Wifi size={18} />
              <BatteryFull size={20} />
            </div>
          </div>

          {/* Notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-0 w-40 h-6 bg-black rounded-b-2xl z-30 shadow-md" />

          {/* Main WhatsApp Screen */}
          <div className="flex flex-col h-full w-full overflow-hidden bg-[#ECE5DD]">
            {/* Header */}
            <header className="h-14 bg-[#128C7E] text-white px-2 pr-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ChevronLeft />
                <div className="w-8 h-8 bg-white/30 rounded-full mr-1" />
                <div>
                  <div className="text-sm font-medium">John Doe</div>
                  <div className="text-xs text-white/80">online</div>
                </div>
              </div>
            </header>

            {/* Chat Messages */}
            <main ref={chatRef} className="flex-1 overflow-y-auto p-3">
              <div className="flex flex-col gap-2">
                {chat.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`max-w-[75%] px-3 py-2 rounded-lg text-sm relative ${
                      msg.role === 'user'
                        ? 'ml-auto bg-[#DCF8C6] text-gray-900'
                        : 'bg-white text-gray-900'
                    }`}
                  >
                    <div>{msg.content}</div>
                    <div className="text-[10px] text-gray-500 text-right mt-1">{msg.time}</div>
                  </div>
                ))}
              </div>
            </main>

            {/* Input & Buttons */}
            {/* <div className="p-3 bg-[#F0F0F0]">
              {!isEvaluated ? (
                <>
                  <div className="flex gap-2">
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                      className="flex-1 border px-3 py-2 rounded"
                      placeholder="Type your response..."
                      disabled={loading}
                    />
                    <button
                      onClick={sendMessage}
                      disabled={loading}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      {loading ? 'Sending...' : 'Send'}
                    </button>
                  </div>

                  <button
                    onClick={evaluateChat}
                    className="mt-3 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
                    disabled={loading}
                  >
                    End & Evaluate
                  </button>
                </>
              ) : (
                <div className="mt-3 p-3 bg-yellow-100 rounded text-sm whitespace-pre-line">
                  {evaluation}
                </div>
              )}
            </div> */}
            <div className="p-3 bg-[#F0F0F0]">
  {!isEvaluated ? (
    <>
      {/* WhatsApp-style input */}
      <div className="px-3 py-2 border-t border-gray-300 flex items-center gap-2">
        <div className="flex items-center gap-2 bg-white px-3 py-2.5 rounded-full flex-1 border border-gray-300">
          <Smile className="text-gray-600" size={20} />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message"
            className="flex-1 bg-transparent text-sm focus:outline-none"
            disabled={loading}
          />
          <Paperclip className="text-gray-600 rotate-45 mr-2" size={20} />
          <Camera className="text-gray-600" size={20} />
        </div>

        <button
          onClick={sendMessage}
          disabled={loading}
          className="p-2 rounded-full bg-[#128C7E] flex items-center justify-center"
        >
          {loading ? (
            <div className="text-white text-xs">...</div>
          ) : (
            <Mic className="text-white" size={24} />
          )}
        </button>
      </div>

      {/* Evaluate Button */}
      <button
        onClick={evaluateChat}
        className="mt-3 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
        disabled={loading}
      >
        End & Evaluate
      </button>
    </>
  ) : (
    <div className="mt-3 p-3 bg-yellow-100 rounded text-sm whitespace-pre-line">
      {evaluation}
    </div>
  )}
</div>

          </div>
        </div>
      </div>
    </div>
    
  );
}
