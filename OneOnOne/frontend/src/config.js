export const backendUrl =
  process.env.NODE_ENV === "production"
    ? "https://oneonone-ht0z.onrender.com"
    : "http://localhost:8000";

export const frontendUrl =
  process.env.NODE_ENV === "production"
    ? "https://oneonone-project.netlify.app"
    : "http://localhost:3000";
