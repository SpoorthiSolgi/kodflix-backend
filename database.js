// Simple in-memory storage for demo purposes
const users = new Map();

// Mock database functions
const db = {
  run: (sql, params, callback) => {
    if (sql.includes('CREATE TABLE')) {
      callback(null);
    } else if (sql.includes('INSERT')) {
      const [username, email, phone, password] = params;
      const id = users.size + 1;
      users.set(id, { id, username, email, phone, password });
      callback(null, { lastID: id });
    }
  },
  get: (sql, params, callback) => {
    if (sql.includes('SELECT')) {
      const [identifier] = params;
      let user = null;
      for (let [id, userData] of users) {
        if (userData.username === identifier || userData.email === identifier) {
          user = userData;
          break;
        }
      }
      callback(null, user);
    }
  }
};

module.exports = db;
