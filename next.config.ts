import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // cacheComponents는 끄고 강의와 같은 캐싱 모델(revalidatePath, loading.tsx)을 사용
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
