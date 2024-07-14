import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { catchError, retry, debounceTime, map } from 'rxjs/operators';

import { IRepository } from '../Abstractions/IRepository.Service';

import { GeneralErrors } from '../../Core/ExceptionHelpers/GeneralError';
import { KeyValuePairModel } from '../../Models/Shared/KeyValuePair.Model';
import { ResponseObj } from '../../Core/ResponseInfo/ResponseData/ResponseObj';
import { ResponseDataObj } from '../../Core/ResponseInfo/ResponseData/ResponseDataObj';
import { PaggedResult } from '../../Core/SearchControls/PaggedResultInfo/PaggedResult';
import { ResponseDataObjs } from '../../Core/ResponseInfo/ResponseData/ResponseDataObjs';
import { CriteriaSearch } from '../../Core/SearchControls/PaggedCriteriaInfo/CriteriaSearch';
import { PaggedCriteriaSearch } from '../../Core/SearchControls/PaggedCriteriaInfo/PaggedCriteriaSearch';
import { ResponseDataPaggedResultObjs } from '../../Core/ResponseInfo/ResponseData/ResponseDataPaggedResultObjs';

export abstract class Repository<TGet,TCreate,TUpdate,TDelete> implements IRepository<TGet,TCreate,TUpdate,TDelete> {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  constructor(protected _http: HttpClient,protected _base: string) {}

  getById(id: string): Observable<ResponseDataObj<TGet>> {
    return this._http.get<ResponseDataObj<TGet>>(this._base +"/"+id)
    .pipe(retry(1),
    catchError(GeneralErrors.GereralError)
    );
  }

  getOne(info:CriteriaSearch<TGet>): Observable<ResponseDataObj<TGet>> {
    return this._http.post<ResponseDataObj<TGet>>(this._base +"/GetOne",JSON.stringify(info),this.httpOptions)
    .pipe(retry(1),
    catchError(GeneralErrors.GereralError)
    );
  }

  findAll(info:CriteriaSearch<TGet>): Observable<ResponseDataObjs<TGet>> {
    return this._http.post<ResponseDataObjs<TGet>>(this._base + "/GetAll",JSON.stringify(info),this.httpOptions)
    .pipe(retry(1),
    catchError(GeneralErrors.GereralError)
    );
  }

  getLite(info:CriteriaSearch<TGet>): Observable<ResponseDataObjs<KeyValuePairModel>> {
    return this._http.post<ResponseDataObjs<KeyValuePairModel>>(this._base + "/GetLite", JSON.stringify(info),this.httpOptions)
    .pipe(retry(1),
    catchError(GeneralErrors.GereralError));
  }

  getTopTenMatched(entity: TGet): Observable<TGet[]> {
    return this._http.post<TGet[]>(this._base + "/GetTopTenMatched/", JSON.stringify(entity),this.httpOptions)
               .pipe(retry(1),debounceTime(500),
                 map(
                  (data: any) => {
                      return (data.data.length != 0 ? data.data as TGet[] : []);
                  }),
                  catchError(GeneralErrors.GereralError)
                  );
  }

  getPaggedResult(info:PaggedCriteriaSearch<TGet>): Observable<ResponseDataPaggedResultObjs<PaggedResult<TGet>>> {
    return this._http.post<ResponseDataPaggedResultObjs<PaggedResult<TGet>>>(this._base + "/GetPaggedResult", JSON.stringify(info),this.httpOptions)
    .pipe(retry(1),
    catchError(GeneralErrors.GereralError));
  }

  create(entity: TCreate): Observable<ResponseDataObj<string>> {
     return this._http.post<ResponseDataObj<string>>(this._base + "/Add", JSON.stringify(entity),this.httpOptions)
     .pipe(retry(1),
     catchError(GeneralErrors.GereralError)
     );
  }

  update(entity: TUpdate): Observable<ResponseDataObj<string>> {
     return this._http.post<ResponseDataObj<string>>(this._base + "/Update" ,JSON.stringify(entity),this.httpOptions)
     .pipe(retry(1),
     catchError(GeneralErrors.GereralError)
     );
  }

  delete(entity: TDelete): Observable<ResponseObj> {
     return this._http.post<ResponseObj>(this._base + "/Delete",JSON.stringify(entity),this.httpOptions)
     .pipe(retry(1),
     catchError(GeneralErrors.GereralError)
     );
 }
}
