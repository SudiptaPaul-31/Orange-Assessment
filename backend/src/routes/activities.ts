import { Router } from 'express';
import db from '../db';
import { Activity } from '../types';

const router = Router();

router.post('/', (req, res) => {
  const { userId, activityType, duration, timestamp } = req.body;
  
  if (!userId || !activityType || !duration) {
    return res.status(400).json({ error: 'Missing required fields: userId, activityType, duration' });
  }
  
  const timestampISO = timestamp || new Date().toISOString();
  
  const stmt = db.prepare(`
    INSERT INTO activities (userId, activityType, duration, timestamp)
    VALUES (?, ?, ?, ?)
  `);
  
  const info = stmt.run(userId, activityType, duration, timestampISO);
  
  res.status(201).json({ 
    message: 'Activity recorded', 
    id: info.lastInsertRowid 
  });
});

export default router;