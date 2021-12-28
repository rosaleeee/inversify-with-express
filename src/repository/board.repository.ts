import { inject, injectable } from 'inversify';
import TYPES from '../constant/types';
import { RequestCreateBoard } from '../models/board.model';
import { QueryInfo } from '../models/transaction.model';
import { BoardQuery, BoardQueryId } from '../query/board.query';
import DBConnecitonFactory from '../utils/dbConnectionFactory.util';
import BaseMysqlRepository from './baseMysql.repository';
import BoardRepositoryInterface from './board.repository.interface';

@injectable()
class BoardRepository extends BaseMysqlRepository implements BoardRepositoryInterface {
  constructor(@inject(TYPES.mysqlPool) protected mysqlPool: DBConnecitonFactory) {
    super(mysqlPool);
  }

  public async createBoard<T>(request: RequestCreateBoard, connection?: any): Promise<T> {
    const queryInfo: QueryInfo = BoardQuery(BoardQueryId.createBoard, request);
    return await this.insertByObj(queryInfo.query, queryInfo.queryParams, connection);
  }

  public async getBaord<T>(request: number, connection?: any): Promise<T> {
    const queryInfo: QueryInfo = BoardQuery(BoardQueryId.getBoard, request);
    const rows = await this.query<T>(queryInfo.query, queryInfo.queryParams, connection);

    let result: T;
    if (rows && rows.length > 0) {
      result = rows[0];
    }
    return result;
  }
}

export default BoardRepository;
