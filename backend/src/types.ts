export interface Activity {
  id?: number;
  userId: string;
  activityType: string;
  duration: number;
  timestamp: string;
  createdAt?: string;
}

export interface UserStats {
  userId: string;
  totalActivities: number;
  avgDuration: number;
  mostFrequentActivity: string;
  mostActiveDay: string;
  mostActiveHourBlock: string;
  weeklyTrend: 'increasing' | 'decreasing' | 'stable' | 'insufficient_data';
  consistencyScore: number;
}