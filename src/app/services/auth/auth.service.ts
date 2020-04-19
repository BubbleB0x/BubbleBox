import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

// Capacitor Plugins
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

// JWT Token decoder
import * as jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Variabile contente l'access_token una volta effettuato l'accesso
  private access_token = null;

  constructor(private http: HttpClient, private router: Router) { }

  /**
   * Metodo set per l'access_token
   * 
   * @param access_token parametro contente l'access_token
   */
  setAccessToken(access_token) {
    this.access_token = access_token;
  }

  /**
   * Metodo get per l'access_token
   */
  getAccessToken() {
    return this.access_token;
  }

  /**
   *  Metodo per ottnere le informazioni contenute nell'access token
   */
  getAccessTokenDecode() {
    return jwtDecode(this.access_token);
  }

  /**
   * Metodo per effettuare il login
   * 
   * @param cred array contente password e username
   */
  login(cred) {
    return this.http.post(environment.apiUrlLocal + '/login', {}, {
      //Headers
      headers: new HttpHeaders({
        // Aggiungo la basicAuth codificanto in base64 username:password 
        'Authorization': 'Basic ' + btoa(cred.username + ':' + cred.password)
      })
    })
  }

  /**
   * Metodo per eseguire il logout dall'app
   */
  async logout() {
    await Storage.clear().then(() => {
      this.router.navigate(['/login']);
      this.access_token = null;
    }, err => {
      console.log('failed clean storage');
    });
  }

  /**
   * Metodo per la registrazione all'app
   * 
   * @param data parametro contente tutte le generalità dell'utente
   */
  reg(data) {
    return this.http.post(environment.apiUrlLocal + "/reg", data);
  }

}
