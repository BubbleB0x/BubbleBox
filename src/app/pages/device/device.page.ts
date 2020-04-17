import { Component, OnInit } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { UsersService } from 'src/app/services/users/users.service';
import { ToastController } from '@ionic/angular';
import { AccessToken } from 'src/app/interfaces/apiKey/access_token';

import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

var jwtDecode = require('jwt-decode');

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

  showSync = true;

  constructor(private barcodeScanner: BarcodeScanner, private usersService: UsersService, public toastController: ToastController) { }

  async ngOnInit() {
    await this.showSlider();
    console.log(this.showSync)
  }

  scanCode() {
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        this.usersService.syncDevice(barcodeData.text).then(async (result: AccessToken) => {
          // Memorizzo l'access token nello store per la persistenza
          await Storage.set({
            key: 'access_token',
            value: result.access_token
          }).then(async () => {
            this.showSync = false;
            await this.SyncSuccessToast();
          });
        }, error => {
          console.log(error)
          if (error.errno = 1062) {
            this.SyncErrorToast("device already synchronized");
          } else {
            this.SyncErrorToast("error")
          }
        });
      })
      .catch(err => {
        console.log("Error", err);
      });
  }

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

  async showSlider() {
    const reqKey = await Storage.get({ key: 'access_token' });
    if (jwtDecode(reqKey.value)["user"]["device"] == null) {
      this.showSync = true;
    } else {
      this.showSync = false;
    }
    console.log(jwtDecode(reqKey.value).user.device)
  }
}
