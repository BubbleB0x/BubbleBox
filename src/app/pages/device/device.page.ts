import { Component, OnInit } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';

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

  //BarcodeScanner Variables
  scannedData: any;
  encodedData: '';
  encodeData: any;

  constructor(private barcodeScanner: BarcodeScanner) { }

  ngOnInit() {
  }

  scanCode() {
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        console.log(barcodeData);
        this.scannedData = barcodeData;
      })
      .catch(err => {
        console.log("Error", err);
      });
  }

}
