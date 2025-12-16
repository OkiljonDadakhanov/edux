/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const isGithubPages = process.env.DEPLOY_TARGET === "github";

const nextConfig = {
  // Only use basePath for GitHub Pages, not for Vercel
  basePath: isGithubPages ? "/E-learning" : "",
  assetPrefix: isGithubPages ? "/E-learning/" : "",
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;