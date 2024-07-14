import { ResponseObj } from './ResponseObj';

export class ResponseDataPaggedResultObjs<TEntity> extends ResponseObj {
  data: TEntity | null = null;
}
