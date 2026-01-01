import "dotenv/config";
import sql from "mssql";
import mysql from 'mysql2/promise'

export async function connectDBMysql() {
  try {

      const conexion = await mysql.createConnection({
      host: process.env.HOST_MYSQL,
      user: process.env.USER_MYSQL,
      password: process.env.PASS_MYSQL,
      database: process.env.DB_MYSQL,
      port: process.env.PORT_MYSQL
    });
    console.log("Conectado correctamente");
    return conexion;
  } catch (error) {
    console.error('No se pudo conectar:', error);
  }
}
