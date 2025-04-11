const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const logger = require('./middleware/logger');

app.use(express.json());
app.use(logger);
app.use('/', userRoutes);

// Error handling for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
