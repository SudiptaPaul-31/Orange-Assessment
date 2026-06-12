import ActivityForm from '../components/ActivityForm';
import InsightsView from '../components/InsightsView';

export default function Home() {
  return (
    <div className="container">
      <div className="card" style={{ textAlign: 'center' }}>
        <h1> Activity Insight Engine</h1>
        <p className="subtitle">
          Log your activities and get AI-powered insights about your patterns
        </p>
      </div>
      
      <ActivityForm />
      <InsightsView />
      
      <div className="card" style={{ background: '#f0f9ff', textAlign: 'center' }}>
        <p style={{ color: '#666', fontSize: '0.875rem' }}>
           The system uses rule-based statistics + Gemini AI to find patterns you might miss
        </p>
      </div>
    </div>
  );
}