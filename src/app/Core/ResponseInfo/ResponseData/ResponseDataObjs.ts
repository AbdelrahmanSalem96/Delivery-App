import { ResponseObj } from './ResponseObj';

export class ResponseDataObjs<TEntity> extends ResponseObj {
  data: TEntity[] = [];
}
