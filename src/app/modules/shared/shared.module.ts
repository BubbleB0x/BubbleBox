import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from 'src/app/components/shared/toolbar/toolbar.component';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from 'src/app/components/shared/menu/menu.component';

@NgModule({
  declarations: [
    ToolbarComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ToolbarComponent,
    MenuComponent
  ]
})
export class SharedModule { }
