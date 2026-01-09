const app = require('./app');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const Resume = require('./models/Resume');

dotenv.config();

const PORT = process.env.PORT || 5001;

sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to sync database:', err);
});
