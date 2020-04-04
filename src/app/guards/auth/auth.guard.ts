import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  async canActivate() {
    const reqKey = await Storage.get({ key: 'reqBasicKey' });
    console.log(reqKey);
    if (reqKey.value === null) {
      this.router.navigate(['/login'])
    }
    return true;
  }

}
