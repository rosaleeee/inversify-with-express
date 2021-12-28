import { QueryInfo } from '../models/transaction.model';

export enum BoardQueryId {
  createBoard,
  getBoard,
  getBoards,
}

export const BoardQuery = (queryId: BoardQueryId, request?: any): QueryInfo => {
  const queryInfo: QueryInfo = {
    query: ``,
    queryParams: [],
  };
  const query: string[] = [];
  const queryParams: any[] = [];

  switch (queryId) {
    case BoardQueryId.createBoard:
      query.push(`
        INSERT INTO board
        (
          board_title,
          board_content
        )
        VALUE(?, ?)
      `);
      queryParams.push(request.title, request.content);
      break;

    case BoardQueryId.getBoard:
      query.push(`
        SELECT
          board_no AS id,
          board_title AS title,
          board_content AS content
        FROM board b
        WHERE board_no = ?
      `);
      queryParams.push(request);

    case BoardQueryId.getBoards:
      query.push(`
        SELECT
          b.board_no AS id,
          b.board_title AS title,
          b.board_content AS content
        FROM board b
        WHERE TRUE
      `);
      if (request.keyword && request.searchType) {
        switch (request.searchType) {
          case 'title':
            query.push(` AND INSTR(b.board_title, ?) > 0 `);
            queryParams.push(request.keyword);
            break;
          case 'content':
            query.push(` AND INSTR(b.board_content, ?) > 0 `);
            queryParams.push(request.keyword);
            break;
          case 'title_content':
            query.push(` AND INSTR(b.board_title, ?) > 0 OR INSTR(b.board_content, ?) > 0 `);
            queryParams.push(request.keyword, request.keyword);
            break;
          default:
            break;
        }
      }
      break;

    default:
      break;
  }

  if (query.length > 0) {
    queryInfo.query = query.join(' ');
    queryInfo.queryParams = queryParams;
  }

  return queryInfo;
};
