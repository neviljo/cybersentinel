// import { useEffect, useRef, useState } from 'react';
// import MobileFrameWrapper from './MobileFrameWrapper';
// import { Menu, Pencil, Star, ArrowLeft, Archive, Trash2, MoreVertical } from "lucide-react";
// import { motion } from "framer-motion";

// export default function EmailPhishingSimulation() {
//   const [chat, setChat] = useState([]);
//   const [input, setInput] = useState('');
//   const [isEvaluated, setIsEvaluated] = useState(false);
//   const [evaluation, setEvaluation] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const chatRef = useRef(null);

//   useEffect(() => {
//     if (chatRef.current) {
//       chatRef.current.scrollTop = chatRef.current.scrollHeight;
//     }
//   }, [chat]);

//   useEffect(() => {
//     const loadInitialMessage = async () => {
//       setLoading(true);
//       try {
//         const formattedEmailHTML = `
//           <div style="font-family: Arial, sans-serif; color: #333; background-color: #f9f9f9;">
//             <p><strong>Subject:</strong> Exciting Remote Job Opportunity Just for You!</p>
//             <p>Dear Valued Candidate,</p>
//             <p>We have identified your profile as a great match for a unique <strong>remote job opportunity</strong> that aligns with your skills.</p>
//             <p>To proceed, please <strong>verify your account</strong> by completing the secure form below. This step is mandatory to keep your profile active.</p>
//             <p style="margin: 20px 0;">
//               👉 <a href="https://malicious-verify-link.com" style="color: #1a73e8; text-decoration: none;" target="_blank"><strong>Click here to verify your account</strong></a>
//             </p>
//             <p>Thank you for your immediate attention.</p>
//             <p>Regards,<br>
//             <strong>John Smith</strong><br>
//             Elite Recruitment Agency</p>
//           </div>
//         `;
//         setChat([{ role: 'assistant', content: formattedEmailHTML }]);
//       } catch {
//         alert("❌ Failed to load initial email.");
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
//       const res = await fetch("http://localhost:4000/api/get-email-phish", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ chatHistory: newChat }),
//       });

//       const data = await res.json();
//       setChat([...newChat, { role: 'assistant', content: data.message }]);
//     } catch {
//       alert("❌ Failed to get attacker message.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const evaluateChat = async () => {
//     const prompt = `
// This is a simulated phishing email conversation:
// ${chat.map(msg => `${msg.role === 'user' ? 'Victim' : 'Attacker'}: ${msg.content}`).join('\n')}

// Evaluate how the victim responded. Did they fall for it? Why or why not?

// Format the result like this:
// <h1>SUMMARY ANALYSIS</h1>
// <ul><li>Point</li></ul>
// <h3><b>DO'S</b></h3>
// <ul><li>Do this</li></ul>
// <h3><b>DON'TS</b></h3>
// <ul><li>Don't do this</li></ul>

// Keep language simple and avoid markdown or asterisks.
// `.trim();

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
//       setEvaluation(data.choices?.[0]?.message?.content || "No analysis available.");
//       setIsEvaluated(true);
//     } catch {
//       alert("❌ Evaluation failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <MobileFrameWrapper>
//     <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow">
//       <h2 className="text-2xl font-bold mb-4 text-center">📧 Email Phishing Simulation</h2>

//       <div ref={chatRef} className="h-80 overflow-y-scroll border p-3 rounded mb-4 bg-gray-50">
//         {chat.map((msg, idx) => (
//           <div key={idx} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
//             <div
//               className={`inline-block px-4 py-2 rounded-lg max-w-xs break-words ${
//                 msg.role === 'user' ? 'bg-blue-200' : 'bg-yellow-100'
//               }`}
//               {...(msg.role === 'assistant'
//                 ? { dangerouslySetInnerHTML: { __html: msg.content } }
//                 : { children: msg.content })}
//             />
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
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//               disabled={loading}
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
//         <div
//           className="mt-4 p-4 bg-yellow-100 rounded text-sm leading-relaxed"
//           dangerouslySetInnerHTML={{ __html: evaluation }}
//         />
//       )}
//     </div>
//     </MobileFrameWrapper>
//   );
// }

import { useEffect, useRef, useState } from 'react';
import MobileFrameWrapper from './MobileFrameWrapper';
import {
  Menu, Pencil, Star, ArrowLeft, Archive, Trash2, MoreVertical
} from "lucide-react";
import { motion } from "framer-motion";

export default function EmailPhishingSimulation() {
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState('');
  const [isEvaluated, setIsEvaluated] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  const selectedEmail = {
    subject: "Exciting Remote Job Opportunity Just for You!",
    sender: "Elite Recruitment Agency",
    time: "April 11, 2025, 10:15 AM",
    
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chat]);

  useEffect(() => {
    const loadInitialMessage = async () => {
      setLoading(true);
      try {
        const formattedEmailHTML = `
          <div style="font-family: Arial, sans-serif; color: #333; ">
            <p><strong>Subject:</strong> Exciting Remote Job Opportunity Just for You!</p>
            <p>Dear Valued Candidate,</p>
            <p>We have identified your profile as a great match for a unique <strong>remote job opportunity</strong> that aligns with your skills.</p>
            <p>To proceed, please <strong>verify your account</strong> by completing the secure form below. This step is mandatory to keep your profile active.</p>
            <p style="margin: 20px 0;">
              👉 <a href="https://malicious-verify-link.com" style="color: #1a73e8; text-decoration: none;" target="_blank"><strong>Click here to verify your account</strong></a>
            </p>
            <p>Thank you for your immediate attention.</p>
            <p>Regards,<br>
            <strong>John Smith</strong><br>
            Elite Recruitment Agency</p>
          </div>
        `;
        setChat([{ role: 'assistant', content: formattedEmailHTML }]);
      } catch {
        alert("❌ Failed to load initial email.");
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
      const res = await fetch("http://localhost:4000/api/get-email-phish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatHistory: newChat }),
      });

      const data = await res.json();
      setChat([...newChat, { role: 'assistant', content: data.message }]);
    } catch {
      alert("❌ Failed to get attacker message.");
    } finally {
      setLoading(false);
    }
  };

  const evaluateChat = async () => {
    const prompt = `
This is a simulated phishing email conversation:
${chat.map(msg => `${msg.role === 'user' ? 'Victim' : 'Attacker'}: ${msg.content}`).join('\n')}

Evaluate how the victim responded. Did they fall for it? Why or why not?

Format the result like this:
<h1>SUMMARY ANALYSIS</h1>
<ul><li>Point</li></ul>
<h3><b>DO'S</b></h3>
<ul><li>Do this</li></ul>
<h3><b>DON'TS</b></h3>
<ul><li>Don't do this</li></ul>

Keep language simple and avoid markdown or asterisks.
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
      setEvaluation(data.choices?.[0]?.message?.content || "No analysis available.");
      setIsEvaluated(true);
    } catch {
      alert("❌ Evaluation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MobileFrameWrapper>
      <div className="max-w-xl mx-auto mt-6 bg-white rounded-lg shadow flex flex-col">
        
        {/* Email Header UI */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <ArrowLeft size={22} className="text-gray-700" />
            <h2 className="text-lg font-semibold text-gray-800">
              {selectedEmail.subject}
            </h2>
          </div>
          <div className="flex gap-4 text-gray-500">
            <button className="hover:text-gray-700"><Archive size={20} /></button>
            <button className="hover:text-red-500"><Trash2 size={20} /></button>
            <button className="hover:text-gray-700"><MoreVertical size={20} /></button>
          </div>
        </div>

        {/* Email Meta & Snippet */}
        <div className="px-4 pt-3 pb-1 text-sm text-gray-600">
          <div className="mb-1">From: <strong>{selectedEmail.sender}</strong></div>
          <div className="text-xs text-gray-500 mb-2">{selectedEmail.time}</div>
          <p className="text-gray-700 text-[15px] leading-relaxed mb-3">
            {selectedEmail.snippet}
          </p>
        </div>

        {/* Chat History */}
        <div ref={chatRef} className="h-80 overflow-y-scroll border-t p-3 bg-gray-50">
          {chat.map((msg, idx) => (
            <div key={idx} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
              <div
                className={`inline-block px-4 py-2 rounded-lg max-w-xs break-words ${
                  msg.role === 'user' ? 'bg-blue-200' : 'bg-white-100'
                }`}
                {...(msg.role === 'assistant'
                  ? { dangerouslySetInnerHTML: { __html: msg.content } }
                  : { children: msg.content })}
              />
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t">
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
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send'}
                </button>
              </div>
              <button
                onClick={evaluateChat}
                className="mt-3 w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                disabled={loading}
              >
                End & Evaluate
              </button>
            </>
          ) : (
            <div
              className="mt-3 p-3 bg-white-100 rounded text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: evaluation }}
            />
          )}
        </div>
      </div>
    </MobileFrameWrapper>
  );
}
