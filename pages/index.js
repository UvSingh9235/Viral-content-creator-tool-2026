import { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!input) return alert("Topic likhiye!");
    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent("Write a viral hinglish post about: " + input);
      setOutput(result.response.text());
    } catch (e) { alert("API Key check karein!"); }
    setLoading(false);
  };

  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100vh', padding: '20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#0070f3' }}>ViralGen AI 🚀</h1>
      <input 
        style={{ padding: '12px', width: '85%', borderRadius: '8px', border: 'none', marginBottom: '10px', color: '#000' }}
        placeholder="Apna topic yahan likhein..."
        onChange={(e) => setInput(e.target.value)}
      />
      <br />
      <button onClick={generate} style={{ padding: '12px 25px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold' }}>
        {loading ? "AI Soch raha hai..." : "Post Banao ✨"}
      </button>
      <div style={{ marginTop: '30px', textAlign: 'left', whiteSpace: 'pre-wrap', background: '#111', padding: '15px', borderRadius: '10px' }}>
        {output}
      </div>
    </div>
  );
}
