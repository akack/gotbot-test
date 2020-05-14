import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './models/user.interface';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public apiURL = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  AddNewUser(user: User) {
    return this.http.post<any>(this.apiURL + 'server/user', JSON.stringify(user), this.httpOptions);
  }
}
