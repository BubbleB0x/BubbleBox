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
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Variabile contente l'access_token una volta effettuato l'accesso
  private access_token = null;

  // Utente Autenticato
  authUser: User;

  constructor(private http: HttpClient, private router: Router) { }

  /**
   * Metodo set per l'access_token
   * 
   * @param access_token parametro contente l'access_token
   */
  setAccessToken(access_token: string) {
    this.access_token = access_token;
    this.setAuthUser();
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
   *  Metodo per inserire l'access token nello store
   * 
   * @param access_token access token
   */
  async setStoreAccessToken(access_token: string) {
    // Memorizzo l'access token nello store per la persistenza
    await Storage.set({
      key: 'access_token',
      value: access_token
    });
  }

  /**
   * Metodo per ottenere il token dallo store
   */
  async getStoreAccessToken() {
    return await Storage.get({ key: 'access_token' });
  }

  /**
   * Metodo per settare l'utente autenticato
   */
   setAuthUser() {
     this.authUser = jwtDecode(this.access_token).user;
     console.log(this.authUser);
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
    await Storage.clear().then(res => {
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
