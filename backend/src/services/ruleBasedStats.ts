import db from '../db';
import { UserStats } from '../types';

export function computeUserStats(userId: string): UserStats {
  const activities = db.prepare(`
    SELECT * FROM activities WHERE userId = ? ORDER BY timestamp ASC
  `).all(userId) as any[];

  if (activities.length === 0) {
    return {
      userId,
      totalActivities: 0,
      avgDuration: 0,
      mostFrequentActivity: 'none',
      mostActiveDay: 'none',
      mostActiveHourBlock: 'none',
      weeklyTrend: 'insufficient_data',
      consistencyScore: 0
    };
  }

  const totalActivities = activities.length;
  const avgDuration = activities.reduce((sum, a) => sum + a.duration, 0) / totalActivities;

  const typeCount: Record<string, number> = {};
  activities.forEach(a => { typeCount[a.activityType] = (typeCount[a.activityType] || 0) + 1; });
  const mostFrequentActivity = Object.entries(typeCount).sort((a,b) => b[1]-a[1])[0][0];

  const dayCount: Record<number, number> = {};
  activities.forEach(a => {
    const day = new Date(a.timestamp).getDay();
    dayCount[day] = (dayCount[day] || 0) + 1;
  });
  const mostActiveDayNum = Object.entries(dayCount).sort((a,b) => b[1]-a[1])[0][0];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const mostActiveDay = days[parseInt(mostActiveDayNum)];

  const hourCount: Record<number, number> = {};
  activities.forEach(a => {
    const hour = new Date(a.timestamp).getHours();
    hourCount[hour] = (hourCount[hour] || 0) + 1;
  });
  const peakHour = parseInt(Object.entries(hourCount).sort((a,b) => b[1]-a[1])[0][0]);
  let mostActiveHourBlock = '';
  if (peakHour < 12) mostActiveHourBlock = 'Morning';
  else if (peakHour < 17) mostActiveHourBlock = 'Afternoon';
  else if (peakHour < 21) mostActiveHourBlock = 'Evening';
  else mostActiveHourBlock = 'Night';

  const now = new Date();
  const lastWeekStart = new Date(now.getTime() - 7*24*60*60*1000);
  const prevWeekStart = new Date(lastWeekStart.getTime() - 7*24*60*60*1000);
  const lastWeekCount = activities.filter(a => new Date(a.timestamp) >= lastWeekStart).length;
  const prevWeekCount = activities.filter(a => new Date(a.timestamp) >= prevWeekStart && new Date(a.timestamp) < lastWeekStart).length;
  let weeklyTrend: 'increasing' | 'decreasing' | 'stable' | 'insufficient_data' = 'insufficient_data';
  if (prevWeekCount > 0 || lastWeekCount > 0) {
    if (lastWeekCount > prevWeekCount * 1.2) weeklyTrend = 'increasing';
    else if (lastWeekCount < prevWeekCount * 0.8) weeklyTrend = 'decreasing';
    else weeklyTrend = 'stable';
  }

  const dayActivityCounts: Record<string, number> = {};
  activities.forEach(a => {
    const dateKey = new Date(a.timestamp).toISOString().split('T')[0];
    dayActivityCounts[dateKey] = (dayActivityCounts[dateKey] || 0) + 1;
  });
  const counts = Object.values(dayActivityCounts);
  const mean = counts.reduce((s,c) => s+c, 0) / counts.length;
  const variance = counts.reduce((s,c) => s + Math.pow(c-mean,2), 0) / counts.length;
  const stdDev = Math.sqrt(variance);
  const consistencyScore = Math.max(0, Math.min(100, 100 * (1 - stdDev / (mean+1))));

  return {
    userId,
    totalActivities,
    avgDuration: Math.round(avgDuration),
    mostFrequentActivity,
    mostActiveDay,
    mostActiveHourBlock,
    weeklyTrend,
    consistencyScore: Math.round(consistencyScore)
  };
}