import { GoogleGenAI } from '@google/genai';
import { UserStats } from '../types';

const MODEL_NAME = 'gemini-2.0-flash';

export async function generateInsight(stats: UserStats, sampleActivities: any[]): Promise<string> {
  if (stats.totalActivities === 0) {
    return "Start logging your activities! Once you have at least 3 entries, I'll be able to spot patterns and give you personalized insights.";
  }

  if (stats.totalActivities < 3) {
    return "You've just started tracking. Keep adding activities — I'll soon reveal patterns like your most productive hours and weekly rhythms.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
    
    const prompt = `You are a behavioral insight engine. Based on the following user activity data, provide ONE genuinely useful insight that the user would not easily notice themselves. Be specific, actionable, and encouraging. Use second person ("you"). Keep under 120 words.

User Statistics:
- Total activities logged: ${stats.totalActivities}
- Average duration per session: ${stats.avgDuration} minutes
- Most frequent activity: ${stats.mostFrequentActivity}
- Most active day: ${stats.mostActiveDay}
- Most active time period: ${stats.mostActiveHourBlock}
- Weekly trend (last week vs previous): ${stats.weeklyTrend}
- Consistency score (0-100): ${stats.consistencyScore} (higher means more regular daily habit)

Sample of recent activities:
${sampleActivities.slice(0,5).map(a => `- ${a.activityType} for ${a.duration} min on ${new Date(a.timestamp).toLocaleString()}`).join('\n')}

Provide a single insight that is NOT obvious from raw numbers. For example, instead of "you exercise on Tuesdays", say "Your Tuesday evening workouts are consistently longer - consider meal-prepping those days to sustain energy". Avoid generic statements.`;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });
    
    const insight = response.text;
    if (insight && insight.trim().length > 0) {
      return insight.trim();
    } else {
      throw new Error('Empty response');
    }
  } catch (error) {
    console.error('Gemini API Error:', error);
    return `Based on your ${stats.totalActivities} activities: You're most active on ${stats.mostActiveDay} during ${stats.mostActiveHourBlock} (${stats.consistencyScore}% consistency). Your ${stats.mostFrequentActivity} sessions average ${stats.avgDuration} minutes. ${stats.weeklyTrend === 'increasing' ? 'Keep building momentum!' : stats.weeklyTrend === 'decreasing' ? 'Try tback on track this week.' : 'You have a steady rhythm – push a little more.'}`;
  }
}