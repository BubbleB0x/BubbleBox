import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { AuthService } from 'src/app/services/auth/auth.service';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  async canActivate() {
    const reqKey = await this.authService.getStoreAccessToken()
    if (reqKey.value === null) {
      this.router.navigate(['/login'])
    } else {
      if(this.authService.getAccessToken() === null) {
        this.authService.setAccessToken(reqKey.value);
      }
    }
    return true;
  }
}
