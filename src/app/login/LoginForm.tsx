"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl,
      });
      if (res?.error) {
        setError("이메일 또는 비밀번호가 올바르지 않습니다.");
      } else if (res?.ok) {
        router.push(callbackUrl);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <h1 className="text-2xl font-bold text-center mb-1">로그인</h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          serentaeri에 오신 것을 환영합니다
        </p>

        <form onSubmit={handleCredentialsSubmit} className="space-y-3 mb-5">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
          {error && <p className="text-xs text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-gray-900 text-white font-semibold rounded-lg text-sm hover:bg-gray-800 disabled:opacity-50 transition-colors"
          >
            {loading ? "로그인 중..." : "이메일로 로그인"}
          </button>
        </form>

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">또는</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <div className="space-y-2.5">
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl })}
            className="w-full h-12 flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="#4285F4"
                d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
              />
              <path
                fill="#34A853"
                d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
              />
              <path
                fill="#FBBC05"
                d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
              />
              <path
                fill="#EA4335"
                d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
              />
            </svg>
            <span>Google로 계속하기</span>
          </button>

          <button
            type="button"
            onClick={() => alert("카카오 로그인은 준비 중입니다")}
            className="w-full h-12 flex items-center justify-center gap-3 rounded-lg text-sm font-medium transition-colors"
            style={{ backgroundColor: "#FEE500", color: "#191600" }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="#191600"
                d="M9 1.5C4.858 1.5 1.5 4.134 1.5 7.385c0 2.117 1.424 3.972 3.575 4.99l-.91 3.325c-.081.294.257.53.508.354l3.971-2.63c.117.011.236.018.356.018 4.142 0 7.5-2.634 7.5-5.885S13.142 1.5 9 1.5z"
              />
            </svg>
            <span>카카오로 계속하기</span>
          </button>

          <button
            type="button"
            onClick={() => alert("네이버 로그인은 준비 중입니다")}
            className="w-full h-12 flex items-center justify-center gap-3 rounded-lg text-sm font-medium text-white transition-colors"
            style={{ backgroundColor: "#03C75A" }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path fill="#ffffff" d="M10.5 8.7L5.8 2H2v12h3.5V7.3L10.2 14H14V2h-3.5v6.7z" />
            </svg>
            <span>네이버로 계속하기</span>
          </button>
        </div>

        <p className="text-xs text-gray-400 text-center mt-6">
          계속 진행 시 serentaeri의 이용약관에 동의하게 됩니다
        </p>
      </div>
    </div>
  );
}
