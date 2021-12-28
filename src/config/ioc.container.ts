import { Container } from 'inversify';
import TYPES from '../constant/types';
import DBConnecitonFactory from '../utils/dbConnectionFactory.util';

const container = new Container();

container.bind<DBConnecitonFactory>(TYPES.mysqlPool).to(DBConnecitonFactory);

export default container;
