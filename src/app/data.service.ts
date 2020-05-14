import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './models/user.interface';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public postUrl = 'http://localhost:3000/server/user';
  private getUrl = 'http://localhost:3000/server/getUserDetails';
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  AddNewUser(user: User) {
    return this.http.post<any>(this.postUrl, JSON.stringify(user), this.httpOptions);
  }

  getUserDetails(email: any) {
    return this.http.get<any>(`${this.getUrl}/${email}`);
  }
}
