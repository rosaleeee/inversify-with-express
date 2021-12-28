export interface RequestCreateBoard {
  title: string;
  content: string;
}

export interface RequestGetBoards {
  keyword?: string;
  searchType?: string;
}
