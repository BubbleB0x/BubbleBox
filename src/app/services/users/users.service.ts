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

  /**
   * Metodo per l'invio di una nuova segnalazione da parte di un utente
   *
   * @param report parametro contente i sintomi dell'utente
   */
  sendReport(report) {
    return this.http.post(
      environment.apiUrlLocal + '/users/reporting', {
      // Body
      "report": report
    }, {
      headers: new HttpHeaders({
        // Add Baerer Token
        'Authorization': 'Baerer ' + this.authService.getAccessToken()
      })
    });
  }

  /**
   * Metodo per l'invio dei blasts
   */
  sendBlasts(blasts: Array<string>) {
    return this.http.post(environment.apiUrlLocal + '/devices/blast', {
      "blast": blasts
    }, {
      headers: new HttpHeaders({
        // Add Baerer Token
        'Authorization': 'Baerer ' + this.authService.getAccessToken()
      })
    })
  }
}

