import { Component, OnInit, NgZone } from '@angular/core';

// Serial Bluetooth Plugin
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';

//BLE Bluetooth Plugin
import { BluetoothLE } from '@ionic-native/bluetooth-le/ngx';
import { BLE } from '@ionic-native/ble/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-bt-dash',
  templateUrl: './bt-dash.component.html',
  styleUrls: ['./bt-dash.component.scss'],
})
export class BtDashComponent implements OnInit {

  test;

  devices: any[] = [];

  constructor(private bluetoothSerial: BluetoothSerial, private bluetoothle: BluetoothLE, private plt: Platform, private ble: BLE, private ngZone: NgZone) {
    this.plt.ready().then((readySource) => {

      console.log('Platform ready from', readySource);

      this.bluetoothle.initialize().subscribe(ble => {
        console.log('ble', ble.status) // logs 'enabled'
      });

    });
  }

  ngOnInit() { }

  checkBluetoothStatus() {
    this.bluetoothSerial.isEnabled().then(() => {
      alert('Bluetooth enabled');
    }, function () {
      alert('Bluetooth disabled');
    });
  }

  startScan() {
    this.devices = [];
    this.ble.scan([], 15).subscribe(
      device => this.onDeviceDiscovered(device)
    );
  }
  onDeviceDiscovered(device) {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    console.log("SCAN")
    console.log('Discovered' + JSON.stringify(device, null, 2));
    this.ngZone.run(() => {
      this.devices.push(device)
      console.log(device)
    })
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    
  }

  stopScan() {
    this.bluetoothle.stopScan().then((res) => {
      console.log(res)
    });
  }

  discover() {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    console.log("DISCOVER")
    this.bluetoothSerial.discoverUnpaired().then((device) => {
      this.bluetoothSerial.setDeviceDiscoveredListener().subscribe((device) => {
        //JSON.stringify( device );
        //this.infomation = {id: device.id};
        //this.showDevices("Unparied devices", device.id,device.class,device.address,device.name);
        console.log(device);

      });
    },
      (error) => {
        //this.showError(error);
        console.log("could not find unparied devices " + error);
      });
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
  }

}
