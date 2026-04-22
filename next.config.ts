import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Supabase Storage
      { protocol: "https", hostname: "lurfjyhcghcsoingtxac.supabase.co" },
      // Google 프로필 이미지 (NextAuth OAuth)
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      // 일반 HTTPS 이미지 허용 (관리자가 외부 URL로 상품 이미지 입력 시)
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;
