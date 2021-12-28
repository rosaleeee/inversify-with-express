import { inject, injectable } from 'inversify';
import DBConnecitonFactory from '../utils/dbConnectionFactory.util';

@injectable()
class BaseMysqlRepository {
  constructor(protected mysql: DBConnecitonFactory) {}

  protected async insertByObj<T>(queryStr: string, queryParams?: any[], conn?: any): Promise<T> {
    let result: T;
    let connection;

    try {
      if (conn) {
        connection = conn;
      } else {
        connection = await this.mysql.getConnection();
      }

      result = await connection.query(queryStr, queryParams);
      if (!conn) {
        await connection.commit();
      }
    } catch (error) {
      if (!conn) {
        await connection.rollback();
      }
      throw error;
    } finally {
      if (!conn) {
        await connection.release();
      }
    }

    return result;
  }
}

export default BaseMysqlRepository;
