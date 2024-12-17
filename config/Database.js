import { Sequelize } from 'sequelize';
import path from 'path';

const dbPath = path.join('/app/config', 'database.sqlite');

const db = new Sequelize({
    dialect: 'sqlite',
    storage: dbPath, // Lokasi file database SQLite
    logging: false,  // Nonaktifkan logging query (opsional)
});

export default db;