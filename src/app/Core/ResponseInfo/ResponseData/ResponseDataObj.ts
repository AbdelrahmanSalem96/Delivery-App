import { ResponseObj } from './ResponseObj';

export class ResponseDataObj<TEntity> extends ResponseObj {
  data: TEntity | null = null;
}
