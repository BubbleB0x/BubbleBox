import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { Plugins } from '@capacitor/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getHealtState() {
    return this.http.get(environment.apiUrlLocal + '/users/hs', {
      headers: new HttpHeaders({
        'Authorization': 'Baerer ' + this.authService.getAccessToken()
      })
    });
  }

  syncDevice(mac) {
    return this.http.post(environment.apiUrlLocal + '/users/sync', { "device": btoa(mac) }, {
      headers: new HttpHeaders({
        'Authorization': 'Baerer ' + this.authService.getAccessToken()
      })
    });
  }
}
