import { Container } from 'inversify';
import TYPES from '../constant/types';
import BoardRepository from '../repository/board.repository';
import BoardRepositoryInterface from '../repository/board.repository.interface';
import BoardService from '../services/board.service';
import DBConnecitonFactory from '../utils/dbConnectionFactory.util';

const container = new Container();

container.bind<DBConnecitonFactory>(TYPES.mysqlPool).to(DBConnecitonFactory);

container.bind<BoardRepositoryInterface>(TYPES.BoardRepositoryInterface).to(BoardRepository);
container.bind<BoardService>(TYPES.BoardService).to(BoardService);

export default container;
