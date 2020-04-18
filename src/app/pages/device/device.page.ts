import { Component, OnInit } from '@angular/core';

// Toast message
import { ToastController } from '@ionic/angular';

// Interfaces
import { AccessToken } from 'src/app/interfaces/apiKey/access_token';

// Servizi
import { UsersService } from 'src/app/services/users/users.service';
import { AuthService } from 'src/app/services/auth/auth.service';

// Capacitor Plugins
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;


// Ionic Barcode Plugin
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

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

  constructor(
    private barcodeScanner: BarcodeScanner, private usersService: UsersService, public toastController: ToastController,
    private authService: AuthService) {

  }

  ngOnInit() {
    //Controllo per la visualizzazione dello slider
    this.showSlider();
  }

  /**
   * Metodo per l'attivazione del barcode scanner
   * 
   * @barcodeScanner BarcodeScanner Plugin
   *  */
  scanCode() {
    // Attivazione camera per il barcode scanner
    this.barcodeScanner.scan().then(
      /**
       * Operazioni che avvengono se lo scan ha successo
       *  
       * @barcodeData consiste nel risultato dello scan
       *  */
      (barcodeData) => {
        // Richiamo il metodo per l'invio del device al backend
        this.usersService.syncDevice(barcodeData.text).subscribe(
          /**
         * Operazioni che avvengono se l'inserimento del device avviene con successo
         * 
         * @result è il risultato della chiamata eseguita, contiene al suo interno un nuovo access_token
         *         con specificato il device sincronizzato
         */
          async (result: AccessToken) => {
            // Memorizzo l'access token nello store per la persistenza
            await Storage.set({
              key: 'access_token',
              value: result.access_token
            }).then(
              /**
               * Operazioni che avvengono se l'inserimento dell'access_token nello storage avviene con successo
               */
              async () => {
                // impongo che non sia più visibile lo slider per la sincornizzazione
                this.showSync = false;
                // setto l'access_token nel auth service per usufruirne più agevolmente
                this.authService.setAccessToken(result.access_token)
                // visualizzo il toast di corretto avvenimento delle operazioni
                await this.SyncSuccessToast();
              }
            ).catch(
              /**
               * Operazioni che avvengono se l'inserimento dell'access_token nello storage non avviene con successo
               */
              err => {
                console.log("Error", err);
              }
            );
          },
          /**
           * Operazioni che avvengono se la sync del device con l'utente non va a buon fine
           */
          (err) => {
            console.log(err)
            if (err.errno = 1062) {
              this.SyncErrorToast("device already synchronized");
            } else {
              this.SyncErrorToast("error")
            }
          }
        );
      })
  }

  /**
   * Metodo per la visualizzazione del toast di errore di sync
   * 
   * @param reason consiste nella ragione per la quale la sincronizzazione non è avvenuta 
   */
  async SyncErrorToast(reason) {
    const toast = await this.toastController.create({
      header: 'SYNC FAILED',
      message: reason,
      position: 'bottom',
      color: 'danger',
      duration: 5000,
      buttons: [
        {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

  /**
   * metodo per la visualizzazione del toast di corretta sync
   */
  async SyncSuccessToast() {
    const toast = await this.toastController.create({
      header: 'SYNC SUCCESSFUL',
      message: "Good job!",
      position: 'bottom',
      color: 'success',
      duration: 5000,
      buttons: [
        {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
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
