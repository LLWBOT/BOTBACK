// api/configure.js

// In a serverless environment, using a global variable for state
// is generally discouraged as function instances are ephemeral.
// For a production application, you would typically use a database
// or a more persistent state management solution (like Redis, or a
// dedicated state management service). However, for this example,
// we'll use a simple in-memory object that might persist across
// invocations within the same Vercel instance lifecycle.
global.currentConfig = global.currentConfig || {};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { sessionId, mongodbUrl } = req.body;
      if (sessionId && mongodbUrl) {
        global.currentConfig = { sessionId, mongodbUrl };
        console.log('Configuration received and stored:', global.currentConfig);
        res.status(200).json({ message: 'Configuration received successfully.' });
      } else {
        res.status(400).json({ error: 'Missing sessionId or mongodbUrl in the request body.' });
      }
    } catch (error) {
      console.error('Error processing /api/configure:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
