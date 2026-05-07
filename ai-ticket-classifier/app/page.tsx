export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="flex items-center justify-between p-4">
        <span className="text-xl font-bold">AI Ticket Classifier</span>
      </nav>
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold">Welcome to the AI Ticket Classifier</h1>
          <p className="text-slate-400 text-lg">Upload a CSV, get instant AI classification. Review, edit, export.</p>
          <button className="bg-white text-slate-950 px-6 py-3 rounded-md font-semibold">Get Started</button>
      </div>
    </main>
  );
}
