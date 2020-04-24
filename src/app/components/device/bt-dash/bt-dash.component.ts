import { Component, OnInit, NgZone } from "@angular/core";

// Serial Bluetooth Plugin
import { BluetoothSerial } from "@ionic-native/bluetooth-serial/ngx";

//BLE Bluetooth Plugin
import { BluetoothLE } from "@ionic-native/bluetooth-le/ngx";
import { BLE } from "@ionic-native/ble/ngx";
import { Platform } from "@ionic/angular";
import { UsersService } from "src/app/services/users/users.service";
import { async } from "@angular/core/testing";

@Component({
  selector: "app-bt-dash",
  templateUrl: "./bt-dash.component.html",
  styleUrls: ["./bt-dash.component.scss"],
})
export class BtDashComponent implements OnInit {
  test;

  devices: any[] = [];

  blasts: string[] = [];

  constructor(
    private bluetoothSerial: BluetoothSerial,
    private bluetoothle: BluetoothLE,
    private plt: Platform,
    private ble: BLE,
    private ngZone: NgZone,
    private usersService: UsersService
  ) {
    this.plt.ready().then((readySource) => {
      console.log("Platform ready from", readySource);

      this.bluetoothle.initialize().subscribe((ble) => {
        console.log("ble", ble.status); // logs 'enabled'
      });
    });
  }

  ngOnInit() {}

  checkBluetoothStatus() {
    this.bluetoothSerial.isEnabled().then(
      () => {
        alert("Bluetooth enabled");
      },
      function () {
        alert("Bluetooth disabled");
      }
    );
  }

  Scan() {
    this.devices = [];
    this.ble
      .scan([], 15)
      .subscribe((device) => this.onDeviceDiscovered(device));
  }

  onDeviceDiscovered(device) {
    console.log("Discovered" + JSON.stringify(device, null, 2));
    this.ngZone.run(() => {
      this.devices.push(device);
      console.log(device);
    });
  }

  connect() {
    console.log("--------------------------------------------------------");
    this.bluetoothSerial.connect("24:6F:28:97:17:C2").subscribe(
      () => {
        this.bluetoothSerial.subscribe("\n").subscribe((res) => {
          console.log(res);
          this.blasts.push(btoa(res));
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  sendBlasts() {
    this.usersService.sendBlasts(this.blasts).subscribe(res => {
      this.bluetoothSerial.write("0").then((res) => {
        console.log(res)
        this.blasts = [];
      })
    });
  }
}
