import { Component, OnInit } from '@angular/core';

// Services
import { AuthService } from 'src/app/services/auth/auth.service';

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

  constructor(private authService: AuthService) {}

  ngOnInit() {
    //Controllo per la visualizzazione dello slider
    this.showSlider();
  }

  /**
   *  Metodo per la visualizzazione dello slider per la sync
   */
  async showSlider() {
    // ricavo il device contenuto nel token 
    const device = this.authService.getAccessTokenDecode().user.device
    // se l'utente non ha associato alcun device allora lo slider permane altrimenti scompare
    if (device == null) {
      this.showSync = true;
    } else {
      this.showSync = false;
    }
  }
}
