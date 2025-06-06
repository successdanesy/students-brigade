const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL || 'https://pmdqbgsydekoefrfbzhi.supabase.co',
  process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtZHFiZ3N5ZGVrb2VmcmZiemhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1MTI3NDMsImV4cCI6MjA2NDA4ODc0M30.6eXzdlWY2-kfC_SP7qtSVEyFvK7L9Hs4VzUQ-zBVKEE'
);

// GET counts
app.get('/api/counts', async (req, res) => {
  const { data, error } = await supabase
    .from('donations')
    .select('pints, lives')
    .limit(1)
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// POST update counts
app.post('/api/counts', async (req, res) => {
  const { pints, lives } = req.body;
  const { error } = await supabase
    .from('donations')
    .update({ pints, lives })
    .eq('id', 1);

  if (error) return res.status(500).json({ error: error.message });
  res.send('Data updated successfully');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

