const getImagePrefix = () => {
    // Only use /E-learning/ prefix for GitHub Pages, not Vercel
    const isGithubPages = process.env.NEXT_PUBLIC_DEPLOY_TARGET === "github";
    return isGithubPages ? "/E-learning/" : "/";
};

export { getImagePrefix };