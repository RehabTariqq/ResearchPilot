import { useState } from "react";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const researchQuestion = async () => {
    if (!question.trim()) {
      return;
    }

    setLoading(true);
    setAnswer("");
    setSources([]);
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/research", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question,
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong.");
      }

      const data = await response.json();

      setAnswer(data.answer);
      setSources(data.sources || []);
    } catch (error) {
    console.error("ResearchPilot error:", error);
    setError(error.message);
} finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      researchQuestion();
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f8fc] text-[#172033]">

      {/* Navbar */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-lg text-white">
              R
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight">
                ResearchPilot
              </h1>

              <p className="text-xs text-slate-500">
                Evidence-grounded research
              </p>
            </div>
          </div>

          <a
            href="https://github.com/RehabTariqq/ResearchPilot"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            GitHub ↗
          </a>

        </div>
      </nav>

      {/* Main */}
      <main className="mx-auto max-w-5xl px-6 py-16">

        {/* Hero */}
        <section className="text-center">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
            Research assistant
          </div>

          <h2 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
            Research smarter.
            <br />
            <span className="text-slate-400">
              Start with evidence.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-500">
            Ask a question and ResearchPilot retrieves relevant information
            from your research documents before generating an answer.
          </p>

        </section>

        {/* Search Box */}
        <section className="mt-12">

          <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-200/40">

            <textarea
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a research question..."
              rows="4"
              className="w-full resize-none border-none bg-transparent px-4 py-3 text-lg text-slate-800 outline-none placeholder:text-slate-400"
            />

            <div className="flex items-center justify-between border-t border-slate-100 px-3 pt-3">

              <p className="hidden text-sm text-slate-400 sm:block">
                Press Enter to research
              </p>

              <button
                onClick={researchQuestion}
                disabled={loading || !question.trim()}
                className="ml-auto rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loading ? "Researching..." : "Research →"}
              </button>

            </div>

          </div>

        </section>

        {/* Loading */}
        {loading && (
          <div className="mt-10 flex items-center justify-center gap-3 text-slate-500">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900"></div>
            <span>Searching your research sources...</span>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Answer */}
        {answer && !loading && (
          <section className="mt-12">

            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">
                Answer
              </h3>

              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                Evidence grounded
              </span>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

              <p className="whitespace-pre-wrap text-base leading-8 text-slate-700">
                {answer}
              </p>

            </div>

          </section>
        )}

        {/* Sources */}
        {sources.length > 0 && !loading && (
          <section className="mt-10">

            <div className="mb-5">
              <h3 className="text-xl font-bold text-slate-900">
                Sources
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Documents retrieved to support this answer
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

              {sources.map((source, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >

                  <div className="mb-4 flex items-start justify-between gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-lg">
                      📄
                    </div>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                      {(source.score * 100).toFixed(0)}%
                    </span>

                  </div>

                  <h4 className="font-semibold text-slate-900">
                    {source.filename}
                  </h4>

                  <p className="mt-2 text-sm text-slate-500">
                    Retrieved research source
                  </p>

                </div>
              ))}

            </div>

          </section>
        )}

        {/* Empty state */}
        {!answer && !loading && !error && (
          <section className="mt-16 grid gap-4 sm:grid-cols-3">

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="mb-4 text-2xl">🔎</div>
              <h3 className="font-semibold">Retrieve</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Find relevant information from your research documents.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="mb-4 text-2xl">🧠</div>
              <h3 className="font-semibold">Understand</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Give the language model relevant context before answering.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="mb-4 text-2xl">📚</div>
              <h3 className="font-semibold">Trace</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                See which documents were retrieved for your answer.
              </p>
            </div>

          </section>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-8 text-center text-sm text-slate-400">
          ResearchPilot · Built as an AI engineering project
        </div>
      </footer>

    </div>
  );
}

export default App;