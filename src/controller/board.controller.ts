import * as express from 'express';
import { inject } from 'inversify';
import { controller, httpGet, httpPost, request, response } from 'inversify-express-utils';
import TYPES from '../constant/types';
import { RequestCreateBoard, RequestGetBoards } from '../models/board.model';
import BoardService from '../services/board.service';

@controller('/board')
class BoardController {
  constructor(@inject(TYPES.BoardService) private boardService: BoardService) {}

  @httpPost('/')
  public async createBoard(@request() req: express.Request, @response() res: express.Response) {
    const newPost: RequestCreateBoard = req.body;
    return await this.boardService.createBoard(newPost);
  }

  @httpGet('/:boardId')
  public async getBoard(@request() req: express.Request, @response() res: express.Response) {
    const boardId: number = Number(req.params.boardId);
    return await this.boardService.getBoard(boardId);
  }

  @httpGet('/')
  public async getBoards(@request() req: express.Request, @response() res: express.Response) {
    const searchRequest: RequestGetBoards = {
      keyword: String(req.query.keyword) || undefined,
      searchType: String(req.query.searchType) || undefined,
    };
    return await this.boardService.getBoards(searchRequest);
  }
}

export default BoardController;
