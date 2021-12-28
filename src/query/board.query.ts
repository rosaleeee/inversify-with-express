import { QueryInfo } from '../models/transaction.model';

export enum BoardQueryId {
  createBoard,
  getBoard,
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

    default:
      break;
  }

  if (query.length > 0) {
    queryInfo.query = query.join(' ');
    queryInfo.queryParams = queryParams;
  }

  return queryInfo;
};
