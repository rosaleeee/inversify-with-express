import { RequestCreateBoard, RequestGetBoards } from '../models/board.model';

interface BoardRepositoryInterface {
  createBoard<T>(request: RequestCreateBoard, connection?: any): Promise<T>;
  getBaord<T>(request: number, connection?: any): Promise<T>;
  getBoards<T>(request: RequestGetBoards, connection?: any): Promise<T[]>;
}

export default BoardRepositoryInterface;
