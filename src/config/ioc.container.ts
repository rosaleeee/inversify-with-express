import { Container } from 'inversify';
import TYPES from '../constant/types';
import BoardRepository from '../repository/board.repository';
import BoardRepositoryInterface from '../repository/board.repository.interface';
import DBConnecitonFactory from '../utils/dbConnectionFactory.util';

const container = new Container();

container.bind<DBConnecitonFactory>(TYPES.mysqlPool).to(DBConnecitonFactory);

container.bind<BoardRepositoryInterface>(TYPES.BoardRepositoryInterface).to(BoardRepository);

export default container;
