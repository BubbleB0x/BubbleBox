import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { Plugins } from '@capacitor/core';
import { Router } from '@angular/router';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  login(cred) {
    return this.http.get(environment.apiUrl, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(cred.username + ':' + cred.password)
      })
    })
  }

  async logout() {
    await Storage.clear().then(res => {
      this.router.navigate(['/login']);
    }, err => {
      console.log('failed clean storage');
    });
    
  }
}
