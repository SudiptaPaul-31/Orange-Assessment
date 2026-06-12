import { Router } from 'express';
import db from '../db';
import { computeUserStats } from '../services/ruleBasedStats';
import { generateInsight } from '../services/geminiService';

const router = Router();

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  
  try {
    const sampleActivities = db.prepare(`
      SELECT * FROM activities WHERE userId = ? ORDER BY timestamp DESC LIMIT 10
    `).all(userId);
    
    const stats = computeUserStats(userId);
    const llmInsight = await generateInsight(stats, sampleActivities);
    
    res.json({
      userId,
      stats: {
        totalActivities: stats.totalActivities,
        avgDuration: stats.avgDuration,
        mostFrequentActivity: stats.mostFrequentActivity,
        mostActiveDay: stats.mostActiveDay,
        bestTimeOfDay: stats.mostActiveHourBlock,
        consistencyScore: stats.consistencyScore,
        weeklyTrend: stats.weeklyTrend
      },
      insight: llmInsight
    });
  } catch (error) {
    console.error('Insight generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate insight',
      insight: 'Unable to generate insight at this moment. Please try again later.'
    });
  }
});

export default router;