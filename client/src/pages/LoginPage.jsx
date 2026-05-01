import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, GraduationCap, BookOpen, Shield } from "lucide-react";

const USERS = {
  teacher: { email: "prof.mehta@dsce.edu.in", password: "teacher123", name: "Prof. Mehta" },
  student: { email: "student@dsce.edu.in",    password: "student123", name: "Alex Kumar"  },
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [role,     setRole]     = useState("teacher");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPwd,  setShowPwd]  = useState(false);
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const user = USERS[role];
    if (email.trim() !== user.email || password !== user.password) {
      setError("Invalid credentials. Please try the demo credentials.");
      setLoading(false);
      return;
    }
    setLoading(false);
    navigate(role === "teacher" ? "/teacher/dashboard" : "/student");
  };

  const fillDemo = () => {
    setEmail(USERS[role].email);
    setPassword(USERS[role].password);
    setError("");
  };

  return (
    <div className="min-h-screen flex">

      {/* ── Left panel ── */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 flex-col justify-between p-12 relative overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(rgba(99,102,241,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.08) 1px, transparent 1px)",
            backgroundSize: "48px 48px"
          }} />
        {/* Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
              <BookOpen size={20} className="text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-lg leading-none">DSCE</p>
              <p className="text-slate-400 text-xs">Smart Classroom System</p>
            </div>
          </div>
        </div>

        <div className="relative space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white leading-tight">
              Intelligent<br />
              <span className="text-indigo-400">Room Allocation</span><br />
              Platform
            </h1>
            <p className="text-slate-400 mt-4 text-sm leading-relaxed max-w-xs">
              Powered by greedy algorithms, interval trees, and priority queues — automated conflict-free classroom scheduling for DSCE.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { icon: Shield, text: "Conflict detection in O(log n) time" },
              { icon: GraduationCap, text: "Priority-based faculty booking" },
              { icon: BookOpen, text: "Best-fit room allocation algorithm" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center flex-shrink-0">
                  <Icon size={13} className="text-indigo-400" />
                </div>
                <p className="text-slate-400 text-sm">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-slate-600 text-xs">
          Dayananda Sagar College of Engineering, Bangalore · DSA Project 2024
        </p>
      </div>

      {/* ── Right panel ── */}
      <div className="flex-1 flex items-center justify-center bg-slate-50 p-8">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center">
              <BookOpen size={17} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-slate-800">DSCE Smart Classroom</p>
              <p className="text-slate-400 text-xs">Allocation System</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800">Welcome back</h2>
            <p className="text-slate-500 text-sm mt-1">Sign in to access your dashboard</p>
          </div>

          {/* Role toggle */}
          <div className="flex bg-white rounded-2xl border border-slate-200 p-1 mb-8 shadow-sm">
            {["teacher", "student"].map((r) => (
              <button key={r}
                onClick={() => { setRole(r); setError(""); setEmail(""); setPassword(""); }}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
                  ${role === r
                    ? r === "teacher"
                      ? "bg-slate-900 text-white shadow-sm"
                      : "bg-amber-500 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-600"}`}>
                {r === "teacher" ? <BookOpen size={14} /> : <GraduationCap size={14} />}
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
                Email Address
              </label>
              <input type="email" required
                value={email}
                placeholder={USERS[role].email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition shadow-sm" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
                Password
              </label>
              <div className="relative">
                <input type={showPwd ? "text" : "password"} required
                  value={password}
                  placeholder="Enter your password"
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  className="w-full px-4 py-3 pr-12 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition shadow-sm" />
                <button type="button" onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600 transition">
                  {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2.5 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button type="submit" disabled={loading}
              className={`w-full py-3 rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm disabled:opacity-60
                ${role === "teacher" ? "bg-slate-900 hover:bg-slate-800" : "bg-amber-500 hover:bg-amber-600"}`}>
              {loading ? (
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
              ) : <> Sign In <ArrowRight size={15} /> </>}
            </button>
          </form>

          {/* Demo box */}
          <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Demo Credentials</p>
              <button onClick={fillDemo}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold transition">
                Auto-fill →
              </button>
            </div>
            <div className="space-y-1.5 font-mono text-xs">
              <div className="flex items-center gap-3">
                <span className="text-slate-400 w-16">email</span>
                <span className="text-slate-700">{USERS[role].email}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-slate-400 w-16">password</span>
                <span className="text-slate-700">{USERS[role].password}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}