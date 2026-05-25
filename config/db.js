import "dotenv/config";
//import sql from "mssql";
import mysql from 'mysql2/promise'

const db = mysql.createPool({
  host: process.env.HOST_MYSQL,
  user: process.env.USER_MYSQL,
  password: process.env.PASS_MYSQL,
  database: `${process.env.DB_MYSQL}`,
  port: process.env.PORT_MYSQL,
  waitForConnections: true,
  connectionLimit: 50, 
  queueLimit: 0
});

export {db};

    /*const conexion = await mysql.createConnection({    
      host: process.env.HOST_MYSQL,
      user: process.env.USER_MYSQL,
      password: process.env.PASS_MYSQL,
      database: `${process.env.DB_MYSQL}`,
      port: process.env.PORT_MYSQL,
       waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });*/
/*  console.log("Conectado correctamente");
    return connectDBMysql;
  } catch (error) {
    console.error('No se pudo conectar:', error);
  }
}
*/