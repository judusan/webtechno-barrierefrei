
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FridgeItem } from './fridge-item';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  baseUrl = 'http://localhost:3000/fridgeItems';

  constructor(private http: HttpClient) { }

  getAll(): Observable<FridgeItem[]>{
    return this.http.get<FridgeItem[]>(this.baseUrl);
  }

  getOne(id: string): Observable<FridgeItem>{
    return this.http.get<FridgeItem>(this.baseUrl + '/' + id);
  }

  update(id: string, data: FridgeItem): Observable<FridgeItem> {
    return this.http.patch<FridgeItem>(this.baseUrl + '/' + id, data);
  }

  addOne(data: FridgeItem): Observable<FridgeItem> {
    return this.http.post<FridgeItem>(this.baseUrl, data);
  }

  deleteOne(id: string): Observable<any>{
    return this.http.delete<any>(this.baseUrl + '/' + id, {observe: 'response'});
  }     
}
