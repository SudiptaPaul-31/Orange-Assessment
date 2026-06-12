import { useState } from 'react';

const API_URL = 'http://localhost:5001/api';

export default function InsightsView() {
  const [userId, setUserId] = useState('user1');
  const [insight, setInsight] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchInsights = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}/insights/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch insights');
      const data = await response.json();
      setInsight(data);
    } catch (err) {
      setError('Unable to load insights. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2> Get Your Personal Insight</h2>
      <div className="user-input">
        <input 
          type="text" 
          value={userId} 
          onChange={(e) => setUserId(e.target.value)}
          placeholder="User ID"
          style={{ flex: 1 }}
        />
        <button onClick={fetchInsights} disabled={loading}>
          {loading ? 'Analyzing...' : 'Generate Insight'}
        </button>
      </div>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {insight && (
        <div>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">Total Activities</div>
              <div className="stat-value">{insight.stats.totalActivities}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Avg Duration</div>
              <div className="stat-value">{insight.stats.avgDuration} min</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Most Active Day</div>
              <div className="stat-value">{insight.stats.mostActiveDay}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Best Time</div>
              <div className="stat-value">{insight.stats.bestTimeOfDay}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Consistency</div>
              <div className="stat-value">{insight.stats.consistencyScore}%</div>
            </div>
          </div>
          
          <div className="insight-box">
            <strong> AI-Powered Insight:</strong>
            <p style={{ marginTop: '0.5rem', lineHeight: 1.6 }}>{insight.insight}</p>
          </div>
        </div>
      )}
    </div>
  );
}