import { QueryInfo } from '../models/transaction.model';

export enum BoardQueryId {
  createBoard,
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

    default:
      break;
  }

  if (query.length > 0) {
    queryInfo.query = query.join(' ');
    queryInfo.queryParams = queryParams;
  }

  return queryInfo;
};
