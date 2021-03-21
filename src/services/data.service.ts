import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class DataService {

  private baseUrl = environment.apiBaseUrl;
  private url = environment.externalSaveUrl;
  private cache: any = {};

  constructor(private http: HttpClient) {
  }
  getData(route, refresh) {
    if (this.dataForRouteIsCached(route, refresh)) {
      return Observable.of(this.cache[route]);
    } else { // no cached data or refresh requested
      return this.http.get<any>(this.baseUrl + route).map(response => {
        this.cache[route] = response;
        return response;
      });
    }
  }
  postExternal(data) {
    return this.http.post<any>(this.url, data);
  }

  getDataWithParams(route, params, refresh) {
    if (this.dataForRouteIsCached(route, refresh)) {
      return Observable.of(this.cache[route]);
    } else { // no cached data or refresh requested
      return this.http.get<any>(this.baseUrl + route, { params: params }).map(response => {
        this.cache[route] = response;
        return response;
      });
    }
  }

  getRecord(route) {
    return this.http.get<any>(this.baseUrl + route);
  }

  getRecordWithParams(route, params) {
    return this.http.get<any>(this.baseUrl + route, { params: params });
  }

  post(route, data) {
    return this.http.post<any>(this.baseUrl + route, data);
  }
  delete(route) {
    return this.http.delete(this.baseUrl + route).map(response => {
      return response;
    });
  }

  getReport(route) {
    return this.http.get(this.baseUrl + route, { responseType: 'blob' });
  }

  getExternalData(route) {
    return this.http.get<any>(route).map(response => {
      return response;
    });
  }

  dataForRouteIsCached(route, refresh) {
    return this.cache[route] && (refresh === false || refresh === undefined);
  }

  clearCache() {
    this.cache = {};
  }

  clearRouteCache(route) {
    this.cache[route] = null;
  }

  getHttpParams(data: any) {
    let httpParams = new HttpParams();
    Object.keys(data).forEach(function (key) {
      httpParams = httpParams.append(key,
        data[key]
      );
    });
    return data;
  }

    getJSON(jsonurl){
      return this.http.get<any[]>(jsonurl);
    }

}
