const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config(); // For using .env file (optional but secure)

const app = express();
app.use(cors());
app.use(express.json());

// Supabase credentials (replace with your own values or load from .env)
const supabase = createClient(
  'https://pmdqbgsydekoefrfbzhi.supabase.co', // Replace with your project URL
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtZHFiZ3N5ZGVrb2VmcmZiemhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1MTI3NDMsImV4cCI6MjA2NDA4ODc0M30.6eXzdlWY2-kfC_SP7qtSVEyFvK7L9Hs4VzUQ-zBVKEE'                    // Replace with your anon key
);

// GET endpoint to fetch counts
app.get('/api/counts', async (req, res) => {
  const { data, error } = await supabase
    .from('donations')
    .select('pints, lives')
    .limit(1)
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// POST endpoint to update counts
app.post('/api/counts', async (req, res) => {
  const { pints, lives } = req.body;

  // Update the first row
  const { error } = await supabase
    .from('donations')
    .update({ pints, lives })
    .eq('id', 1);

  if (error) return res.status(500).json({ error: error.message });
  res.send('Data updated successfully');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
