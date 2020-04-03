import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { Plugins } from '@capacitor/core';
import { ApiKey } from 'src/app/interfaces/apiKey/api-key';
import { Router } from '@angular/router';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(cred) {
    return this.http.post<ApiKey>(environment.apiUrl + '_security/api_key', {
      "name": "my-api-key"
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(cred.username + ':' + cred.password)
      })
    })
  }
}
