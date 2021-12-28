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
}

export default BoardService;
