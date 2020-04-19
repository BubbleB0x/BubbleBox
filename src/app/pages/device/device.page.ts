import { Component, OnInit } from '@angular/core';

// Servizi
import { UsersService } from 'src/app/services/users/users.service';
import { AuthService } from 'src/app/services/auth/auth.service';

// Capacitor Plugins
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

// JWT Token decoder
import * as jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-device',
  templateUrl: './device.page.html',
  styleUrls: ['./device.page.scss'],
})
export class DevicePage implements OnInit {

  // Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  // Variabile per la visualizzazione dello slider adibito alla sincronizzazione utente -> Device
  showSync = true;

  constructor(private authService: AuthService) {

  }

  ngOnInit() {
    //Controllo per la visualizzazione dello slider
    this.showSlider();
  }

  /**
   *  Metodo per la visualizzazione dello slider per la sync
   */
  async showSlider() {
    // Ottengo l'access token dall'auth service
    const access_token = this.authService.getAccessToken();
    // ricavo il device contenuto nel token 
    const device = jwtDecode(access_token).user.device
    console.log(device)
    // se l'utente non ha associato alcun device allora lo slider permane altrimenti scompare
    if (device == null) {
      this.showSync = true;
    } else {
      this.showSync = false;
    }
  }
}
