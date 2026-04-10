import 'dotenv/config';
import mysql, { type RowDataPacket } from 'mysql2/promise';

const DB_CONFIG = {
host: process.env.DB_HOST ?? 'localhost',
port: Number(process.env.DB_PORT ?? 3307),
user: process.env.DB_USER ?? 'dsw',
password: process.env.DB_PASSWORD ?? 'dsw',
database: process.env.DB_NAME ?? 'yoga-studio',
};

async function resetDatabase() {
const connection = await mysql.createConnection(DB_CONFIG);

try {
    const [rows] = await connection.query<RowDataPacket[]>(
    `SELECT TABLE_NAME AS table_name
    FROM information_schema.tables
    WHERE table_schema = ?`,
    [DB_CONFIG.database],
    );

    const tableNames = rows.map((row) => row.table_name);

    if (tableNames.length === 0) {
    console.log(`No tables found in database ${DB_CONFIG.database}.`);
    return;
    }

    await connection.query('SET FOREIGN_KEY_CHECKS = 0');

    for (const tableName of tableNames) {
    await connection.query(`TRUNCATE TABLE \`${DB_CONFIG.database}\`.\`${tableName}\``);
    console.log(`Truncated ${tableName}`);
    }

    await connection.query('SET FOREIGN_KEY_CHECKS = 1');
    console.log(`Database ${DB_CONFIG.database} reset successfully.`);
} finally {
    await connection.end();
}
}

resetDatabase().catch((error) => {
console.error('Error resetting database:', error);
process.exitCode = 1;
});