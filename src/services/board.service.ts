import { inject, injectable } from 'inversify';
import TYPES from '../constant/types';
import { RequestCreateBoard } from '../models/board.model';
import BoardRepository from '../repository/board.repository';
import DBConnecitonFactory from '../utils/dbConnectionFactory.util';

@injectable()
class BoardService {
  constructor(
    @inject(TYPES.mysqlPool) private mysqlPool: DBConnecitonFactory,
    @inject(TYPES.BoardRepositoryInterface) private repository: BoardRepository
  ) {}

  public async createBoard<T>(request: RequestCreateBoard): Promise<T> {
    let result;
    let connection;

    try {
      connection = await this.mysqlPool.getConnection();
      result = await this.repository.createBoard(request, connection);
    } catch (error) {
      throw error;
    }

    return result;
  }

  public async getBoard<T>(request: number): Promise<T> {
    let result;
    let connection;

    try {
      connection = await this.mysqlPool.getConnection();
      connection.beginTransaction();

      result = await this.repository.getBaord(request, connection);
      if (connection) connection.commit();
    } catch (error) {
      if (connection) connection.rollback();
      throw error;
    } finally {
      if (connection) connection.release();
    }

    return result;
  }
}

export default BoardService;
