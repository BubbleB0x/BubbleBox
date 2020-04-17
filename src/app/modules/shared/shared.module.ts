import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from 'src/app/components/shared/toolbar/toolbar.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ToolbarComponent
  ]
})
export class SharedModule { }
