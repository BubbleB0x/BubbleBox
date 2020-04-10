import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { UsersService } from 'src/app/services/users/users.service';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private usersService: UsersService) { }

  async canActivate() {
    const reqKey = await Storage.get({ key: 'access_token' });
    if (reqKey.value === null) {
      this.router.navigate(['/login'])
    }
    return true;
  }

}
