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
}

export default BoardRepository;
