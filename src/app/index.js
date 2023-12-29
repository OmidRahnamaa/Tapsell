const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;


// Create Mongoose Task and List models
const Task = mongoose.model('Task', {
  title: { type: String, required: true },
  description: String,
  done: Boolean,
  date: { type: Date, default: Date.now },
  list: { type: mongoose.Schema.Types.ObjectId, ref: 'List' },
});

const List = mongoose.model('List', {
  name: { type: String, required: true },
});

app.use(bodyParser.json());



app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/tasks', async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/lists', async (req, res) => {
  try {
    const lists = await List.find();
    res.json(lists);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/lists/:id', async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/tasks/query/:list', async (req, res) => {
    try {
      const tasks = await Task.find({ list: req.params.list });
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  app.get('/api/tasks/:id', async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  app.put('/api/tasks/:id', async (req, res) => {
    try {
      const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  app.delete('/api/tasks/:id', async (req, res) => {
    try {
      await Task.findByIdAndDelete(req.params.id);
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  app.get('/api/completed', async (req, res) => {
    try {
      const completedTasks = await Task.find({ done: true });
      res.json(completedTasks);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  app.get('/api/mainList', async (req, res) => {
    try {
      const mainList = await List.findOne({ name: 'Daily List' });
      res.json(mainList);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// List Endpoints
app.put('/api/lists/:id', async (req, res) => {
    try {
      const list = await List.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(list);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  app.delete('/api/lists/:id', async (req, res) => {
    try {
      await List.findByIdAndDelete(req.params.id);
      await Task.deleteMany({ list: req.params.id });
      res.json({ message: 'List and associated tasks deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  
  
