import "dotenv/config";
import sql from "mssql";
//import {Sequelize, DataTypes} from 'sequelize'
import mysql from 'mysql2/promise'

// user: `${process.env.SQL_USER}`,
/*
SQL_SERVER="DESKTOPSERVER\\MSSQLSERVER2019"
SQL_USER="db_admin"
SQL_PASSWORD="db_admin"
SQL_DATABASE="DB_PRODUCT2025"
JWT_SECRET="UltraSecret2025"
*/
/*
export const sequelize = new Sequelize('DB_PRODUCT2025', 'db_admin', 'db_admin', {
  host: 'DESKTOPSERVER\\MSSQLSERVER2019',
  dialect: 'mssql',
  dialectOptions: {
    options: {
      encrypt: true,
      trustServerCertificate: true
    }
  }
});
*/


/*
const usuario  = sequelize.define('usuario2',{
  id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,        
    },
  usuario:DataTypes.STRING,
  clave: DataTypes.STRING,  
},{
  tableName: "usuario2",
  timestamps: false,
  createdAt: false,
  updatedAt: false,
  id: false
})
  */

//const Emilin = await usuario.create({id:11,usuario:'Emilin', clave:'Rosa'});  

export async function connectDBSqlServer() {
  try {
    //await sequelize.authenticate();
    console.log('Conexión exitosa');
    //const users = await usuario.findAll();
    //console.log(users.every(user => user instanceof usuario)); // true
    //console.log('All users:', JSON.stringify(users, null, 2));
    //const Emilin = await usuario.create({id:11,usuario:'Emilin', clave:'Rosa'}); 
    //return sequelize;
  } catch (error) {
    console.error('No se pudo conectar:', error);
  }
}

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




/*
export const sqlConfig = {
  user: "db_admin",
  password: "db_admin",
  server: "DESKTOPSERVER\\MSSQLSERVER2019",
  database: "DB_PRODUCT2025",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

export async function connectDB() {
  try {    
    sql.connect(sqlConfig);
    console.log("✔ SQL Server conectado");
  } catch (err) {
    console.error("❌ Error SQL:", err);
  }
}*/