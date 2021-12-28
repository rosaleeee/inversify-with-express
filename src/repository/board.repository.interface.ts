import { RequestCreateBoard } from '../models/board.model';

interface BoardRepositoryInterface {
  createBoard<T>(request: RequestCreateBoard, connection?: any): Promise<T>;
}

export default BoardRepositoryInterface;
