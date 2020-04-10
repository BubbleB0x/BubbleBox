import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  async getHealtState() {
    return this.http.get(environment.apiUrlLocal + '/users/hs', {
      headers: new HttpHeaders({
        'Authorization': 'Baerer ' + (await Storage.get({ key: 'access_token' })).value
      })
    }).toPromise()
  }
}
