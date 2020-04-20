import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.page.html',
  styleUrls: ['./reporting.page.scss'],
})
export class ReportingPage {

  symp = [];
  sym: any;
  bodyTemp: number = 36;

  constructor(private dataService: DataService, private fb: FormBuilder, private toastController: ToastController, private router: Router) {
    this.sym = [
      { val: 'Cough', isChecked: false },
      { val: 'Sneezing', isChecked: false },
      { val: 'A runny nose', isChecked: false },
      { val: 'Breathing difficulties', isChecked: false }
    ];
  }
  saveReporting() {
    this.sym.forEach(value => {
      if (value.isChecked) {
        this.symp.push(value.val);
      }
    });

    if (this.symp.length != 0) {
      this.dataService.report(this.symp);
      this.ReportingValidateToast("Thank you for reporting! Your state has changed from healthy to symptomatic!");
      //this.goBack();
    }
    else {
      this.ReportingErrorToast("Please select one or press Cancel to return to the Home page!");
    }
    this.symp = [];
  }


  async ReportingErrorToast(reason) {
    const toast = await this.toastController.create({
      header: 'Reporting FAILED',
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

  async ReportingValidateToast(reason) {
    const toast = await this.toastController.create({
      header: 'Reporting COMPLETE',
      message: reason,
      position: 'bottom',
      color: 'success',
      duration: 3000,
      buttons: [
        {
          text: 'Done',
          role: 'reporting',
          handler: () => {
            console.log('Done clicked');
          }
        }
      ]
    });
    toast.present();
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}