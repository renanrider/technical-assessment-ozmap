import dotenv from 'dotenv';
dotenv.config();

import { app } from '../main/config/app';

const { PORT } = process.env;

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`),
);
