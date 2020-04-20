import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  /**
   * Metodo per ottenere l'attuale stato di salute dell'utente
   */
  getHealtState() {
    return this.http.get(environment.apiUrlLocal + '/users/hs', {
      //Headers
      headers: new HttpHeaders({
        // Add Baerer Token
        'Authorization': 'Baerer ' + this.authService.getAccessToken()
      })
    });
  }

  /**
   * 
   * @param mac metodo per eseguire la sync tra l'utente e il device ad esso associato
   */
  syncDevice(mac) {
    return this.http.post(
      environment.apiUrlLocal + '/users/sync', {
        //Body
        "device": btoa(mac)
      }, {
        //Headers
        headers: new HttpHeaders({
        // Add Baerer Token
        'Authorization': 'Baerer ' + this.authService.getAccessToken()
      })
    });
  }

  async getId() {
    
    return this.http.get(environment.apiUrlLocal + '/users/id', {
      headers: new HttpHeaders({
        'Authorization': 'Baerer ' + (await Storage.get({ key: 'access_token' })).value
      })
    }).toPromise();
  }

  async getR() {
      
    return this.http.get(environment.apiUrlLocal + '/users/symp', {
      
      headers: new HttpHeaders({
        'Authorization': 'Baerer ' + (await Storage.get({ key: 'access_token' })).value
      })
    }).toPromise();
  }

}
