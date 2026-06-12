import { useState } from 'react';

const API_URL = 'http://localhost:5001/api';

export default function ActivityForm() {
  const [userId, setUserId] = useState('user1');
  const [activityType, setActivityType] = useState('');
  const [duration, setDuration] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/activities`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          activityType,
          duration: parseInt(duration),
          timestamp: new Date().toISOString()
        })
      });
      
      if (response.ok) {
        setMessage(' Activity logged successfully!');
        setActivityType('');
        setDuration('');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(' Error logging activity');
      }
    } catch (error) {
      setMessage(' Network error');
    }
  };

  return (
    <div className="card">
      <h2> Log Your Activity</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>User ID</label>
          <input 
            type="text" 
            value={userId} 
            onChange={(e) => setUserId(e.target.value)}
            placeholder="e.g., user1, john_doe"
          />
        </div>
        <div className="form-group">
          <label>Activity Type</label>
          <select value={activityType} onChange={(e) => setActivityType(e.target.value)} required>
            <option value="">Select an activity</option>
            <option value="coding"> Coding</option>
            <option value="workout"> Workout</option>
            <option value="reading"> Reading</option>
            <option value="meditation"> Meditation</option>
            <option value="studying"> Studying</option>
          </select>
        </div>
        <div className="form-group">
          <label>Duration (minutes)</label>
          <input 
            type="number" 
            value={duration} 
            onChange={(e) => setDuration(e.target.value)}
            placeholder="e.g., 45"
            required
          />
        </div>
        <button type="submit">Log Activity</button>
        {message && <p style={{ marginTop: '1rem', color: message.includes('✓') ? 'green' : 'red' }}>{message}</p>}
      </form>
    </div>
  );
}