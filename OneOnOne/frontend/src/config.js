const backendUrl =
  process.env.NODE_ENV === "production"
    ? "https://oneonone-ht0z.onrender.com"
    : "http://localhost:8000";

export default backendUrl;