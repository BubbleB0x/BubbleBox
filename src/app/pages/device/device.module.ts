import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DevicePageRoutingModule } from './device-routing.module';

import { DevicePage } from './device.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { QrDashComponent } from 'src/app/components/device/qr-dash/qr-dash.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DevicePageRoutingModule,
    SharedModule
  ],
  declarations: [
    DevicePage,
    QrDashComponent
  ]
})
export class DevicePageModule {}
