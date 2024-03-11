import dotenv from 'dotenv';
import { MongoHelper } from '../infra/db/mongodb/mongo-helper';

const setupEnviromentVariables = () => {
  dotenv.config();
  const { MONGO_URI, DB_USER, DB_PASSWORD, PORT } = process.env;

  if (!MONGO_URI || !DB_USER || !DB_PASSWORD || !PORT) {
    throw new Error('Missing environment variables');
  }

  return { MONGO_URI, DB_USER, DB_PASSWORD, PORT };
};

const startServer = async () => {
  try {
    const { MONGO_URI, DB_USER, DB_PASSWORD, PORT } =
      setupEnviromentVariables();
    await MongoHelper.connect(MONGO_URI, DB_USER, DB_PASSWORD);

    const { setupApp } = await import('./config/app');
    const app = await setupApp();

    app.listen(PORT, () =>
      console.log(`Server running at http://localhost:${PORT}`),
    );
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();
