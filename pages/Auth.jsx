import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Login / Signup
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || (!isLogin && !name)) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const url = isLogin
        ? "http://localhost:8000/api/auth/login"
        : "http://localhost:8000/api/auth/register";

      const body = isLogin
        ? { email, password }
        : { name, email, password };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      console.log("AUTH SUCCESS:", data);

      // Save token & user details
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert(data.message);

      // Clear form
      setName("");
      setEmail("");
      setPassword("");

      // Redirect to dashboard
      navigate("/dashboard");

    } catch (error) {
      console.error("AUTH ERROR:", error);
      alert("not connect to server");
    }
  };

  // Forgot Password
  const handleForgotPassword = (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email");
      return;
    }

    console.log("RESET PASSWORD EMAIL:", email);
    alert("Password reset link request sent!");
  };

  // Forgot Password Screen
  if (showForgotPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-100 px-4">
        <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center mb-6">
            <div className="bg-emerald-600 p-3 rounded-xl text-white w-fit mx-auto mb-4 shadow-lg shadow-emerald-600/30">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-white">
              Forgot Password?
            </h1>
            <p className="text-zinc-400 text-sm mt-1">
              Enter your email to reset your password.
            </p>
          </div>

          <form onSubmit={handleForgotPassword}>
            <div className="mb-5">
              <label className="block mb-2 text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl font-semibold transition shadow-lg shadow-emerald-600/30"
            >
              Send Reset Link
            </button>
          </form>

          <div className="text-center mt-5">
            <button
              type="button"
              onClick={() => setShowForgotPassword(false)}
              className="text-emerald-400 text-sm font-semibold hover:underline"
            >
              ← Back to Login
            </button>
          </div>

        </div>
      </div>
    );
  }

  // Login / Signup Screen
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-100 px-4">
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center mb-6">
          <div className="bg-emerald-600 p-3 rounded-xl text-white w-fit mx-auto mb-4 shadow-lg shadow-emerald-600/30">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-white">
            {isLogin ? "Welcome Back!" : "Create Account"}
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            {isLogin
              ? "Login to continue to your account"
              : "Sign up to create your account"}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label className="block mb-2 text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 transition"
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block mb-2 text-xs font-semibold text-zinc-300 uppercase tracking-wider">
              Email
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 transition"
            />
          </div>

          <div className="mb-3">
            <label className="block mb-2 text-xs font-semibold text-zinc-300 uppercase tracking-wider">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 transition"
            />
          </div>

          {isLogin && (
            <div className="text-right mb-5">
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-xs text-emerald-400 hover:text-emerald-300 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl font-semibold transition shadow-lg shadow-emerald-600/30 mt-2"
          >
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-zinc-400 mt-6">
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setName("");
              setEmail("");
              setPassword("");
            }}
            className="ml-1.5 text-emerald-400 font-semibold hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>

      </div>
    </div>
  );
}

export default Auth;