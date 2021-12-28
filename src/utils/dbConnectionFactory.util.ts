import { injectable } from 'inversify';
import * as mysql from 'mysql2/promise';

@injectable()
class DBConnecitonFactory {
  private static pool: mysql.Pool;
  private static instance: mysql.PoolConnection;

  public async getConnection(): Promise<mysql.PoolConnection> {
    try {
      const options = {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'localmysql1234',
        database: 'rosa',
        waitForConnections: true,
        connectionLimit: 5,
        multipleStatements: true,
      };

      if (!DBConnecitonFactory.pool) {
        DBConnecitonFactory.pool = mysql.createPool(options);
      }

      if (!DBConnecitonFactory.instance) {
        DBConnecitonFactory.instance = await DBConnecitonFactory.pool.getConnection();
      }

      if (!DBConnecitonFactory.instance.ping()) {
        DBConnecitonFactory.instance = await DBConnecitonFactory.pool.getConnection();
      }
    } catch (error) {
      throw error;
    }

    return DBConnecitonFactory.instance;
  }
}

export default DBConnecitonFactory;
