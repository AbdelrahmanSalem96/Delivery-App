import { Observable } from 'rxjs';
import { KeyValuePairModel } from '../../Models/Shared/KeyValuePair.Model';
import { ResponseObj } from '../../Core/ResponseInfo/ResponseData/ResponseObj';
import { ResponseDataObj } from '../../Core/ResponseInfo/ResponseData/ResponseDataObj';
import { PaggedResult } from '../../Core/SearchControls/PaggedResultInfo/PaggedResult';
import { ResponseDataObjs } from '../../Core/ResponseInfo/ResponseData/ResponseDataObjs';
import { CriteriaSearch } from '../../Core/SearchControls/PaggedCriteriaInfo/CriteriaSearch';
import { PaggedCriteriaSearch } from '../../Core/SearchControls/PaggedCriteriaInfo/PaggedCriteriaSearch';
import { ResponseDataPaggedResultObjs } from '../../Core/ResponseInfo/ResponseData/ResponseDataPaggedResultObjs';


export interface IRepository<TGet,TCreate,TUpdate,TDelete>  {
  getById(id: string): Observable<ResponseDataObj<TGet>>;
  getOne(info:CriteriaSearch<TGet>): Observable<ResponseDataObj<TGet>>;
  findAll(info:CriteriaSearch<TGet>):Observable<ResponseDataObjs<TGet>>;
  getLite(info:CriteriaSearch<TGet>):Observable<ResponseDataObjs<KeyValuePairModel>>;
  getTopTenMatched(entity: TGet): Observable<TGet[]>;
  getPaggedResult(info:PaggedCriteriaSearch<TGet>):Observable<ResponseDataPaggedResultObjs<PaggedResult<TGet>>>
  create(entity: TCreate): Observable<ResponseDataObj<string>>;
  update(entity: TUpdate): Observable<ResponseDataObj<string>>;
  delete(entity: TDelete): Observable<ResponseObj>;
}
