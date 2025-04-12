import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-blue-800 mb-4">🛡️ CyberGuard</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          A real-time interactive cyber awareness simulation platform helping people learn how to protect themselves from phishing, social engineering, and more.
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map(({ title, description, path, emoji }) => (
          <Link
            key={title}
            to={path}
            className="bg-white hover:shadow-2xl p-6 rounded-2xl shadow-md border hover:border-blue-400 transition-all duration-200"
          >
            <div className="text-3xl mb-4">{emoji}</div>
            <h2 className="text-xl font-semibold text-blue-800">{title}</h2>
            <p className="text-gray-600 mt-2 text-sm">{description}</p>
          </Link>
        ))}
      </section>

      <footer className="text-center mt-16 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} CyberGuard | Stay Safe Online 🚀
      </footer>
    </div>
  );
}

const features = [
  {
    title: "💬 WhatsApp Scam Chat Simulation",
    description: "Engage in real-time AI-generated WhatsApp conversations and learn to spot social engineering.",
    path: "/chat-simulation",
    emoji: "💬",
  },
  {
    title: "📩 Email Phishing Simulation",
    description: "Read realistic phishing emails and decide how to respond safely.",
    path: "/email-phishing",
    emoji: "📩",
  },
  {
    title: "📱 SMS Phishing Simulation",
    description: "Test your ability to detect SMS-based phishing scams in a chat format.",
    path: "/sms-phishing",
    emoji: "📱",
  },
  {
    title: "🧠 Cyber Safety Quiz",
    description: "Take a quick MCQ quiz to evaluate your cyber safety awareness.",
    path: "/quiz",
    emoji: "🧠",
  },
  {
    title: "🔐 Password Strength Checker",
    description: "Check how strong your passwords are and get tips to improve them.",
    path: "/password-checker",
    emoji: "🔐",
  },
];
