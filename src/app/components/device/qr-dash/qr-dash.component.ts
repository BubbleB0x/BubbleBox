import { Component, OnInit, Output, EventEmitter} from '@angular/core';
// Ionic Barcode Plugin
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';


// Toast message
import { ToastController } from '@ionic/angular';

// Interfaces
import { AccessToken } from 'src/app/interfaces/apiKey/access_token';

// Services
import { UsersService } from 'src/app/services/users/users.service';
import { AuthService } from 'src/app/services/auth/auth.service';

// Capacitor Plugins
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Component({
  selector: 'app-qr-dash',
  templateUrl: './qr-dash.component.html',
  styleUrls: ['./qr-dash.component.scss'],
})
export class QrDashComponent implements OnInit {

  @Output() closeSlider = new EventEmitter();

  constructor(
    private barcodeScanner: BarcodeScanner, 
    private usersService: UsersService, 
    public toastController: ToastController,
    private authService: AuthService) {

    }

  ngOnInit() { }

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
                // this.showSync = false;
                this.closeSlider.emit(null);
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


}
