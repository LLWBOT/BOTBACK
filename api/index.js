// api/index.js
export default async function handler(req, res) {
  res.status(200).json({ message: 'Vercel backend API is running!' });
}
