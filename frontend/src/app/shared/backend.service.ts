
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FridgeItem } from './fridge-item';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class BackendService {
  userRoute = 'http://localhost:3000/users';
  baseUrl = 'http://localhost:3000/fridgeItems';

  constructor(private http: HttpClient) { }

  registerNewUser(user: User): Observable<User>{
    return this.http.post<User>(this.userRoute, user);
  }

  checkIfExist(email: string): Observable<User>{
    return this.http.get<User>(this.userRoute + '/' + email);
  }

  loginUser(username: string, password: string): Observable<any>{
    return this.http.post<User>(this.userRoute+ '/login/' + username, { password: password });
  }

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
