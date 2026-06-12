import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(__dirname, '../activity.db');
const db = new Database(dbPath);


db.exec(`
  CREATE TABLE IF NOT EXISTS activities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId TEXT NOT NULL,
    activityType TEXT NOT NULL,
    duration INTEGER NOT NULL,
    timestamp TEXT NOT NULL,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX IF NOT EXISTS idx_userId ON activities(userId);
  CREATE INDEX IF NOT EXISTS idx_timestamp ON activities(timestamp);
`);

export default db;