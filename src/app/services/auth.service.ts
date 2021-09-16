import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import {User} from "../interfaces/user.interface";

@Injectable()
export class AuthService {
  baseUrl = 'http://localhost:9090/api/';
  headers: HttpHeaders;

  constructor(private _http: HttpClient,
              private storageService: StorageService) {
    if(storageService.getItem('user'))
      this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(storageService.getItem('user')).token}`
      })
  }

  login(username: string, password: string) {
    const formData = {
      username: username,
      password: password
    };
    return this._http.post(`${this.baseUrl}login`, formData);
  }

  register(formData) {
    return this._http.post(`${this.baseUrl}register`, formData, {headers: this.headers});
  }

  getAllUsers() {
    return this._http.get<User[]>(`${this.baseUrl}users`, {headers: this.headers});
  }

  deleteById(userId) {
    return this._http.delete(`${this.baseUrl}delete/${userId}`, {headers: this.headers})
  }
}
