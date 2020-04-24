import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.page.html',
  styleUrls: ['./reporting.page.scss'],
})
export class ReportingPage {

  reportForm = this.fb.group({
    cough: [false, Validators.required],
    soreThroath: [false, Validators.required],
    runnyNose: [false, Validators.required],
    breathDiff: [false, Validators.required],
    fatigue: [false, Validators.required],
    diarrhea: [false, Validators.required],
    temp: [36, Validators.required],
    hypertension: [false, Validators.required],
    heartDisease: [false, Validators.required],
    diabetes: [false, Validators.required],
    userNotes: ['']
  });

  constructor(
    private fb: FormBuilder,
    private toastController: ToastController,
    private router: Router,
    private usersService: UsersService) { }

  saveReporting() {
    console.log(this.reportForm.value)
    this.usersService.sendReport(this.reportForm.value).subscribe(
      (result) => {
        console.log(result);
        this.ReportingValidateToast("Goos job!");
        this.router.navigate['/home']
      }, (error) => {
        console.log(error);
        this.ReportingErrorToast(error.error.message);
        this.router.navigate['/home']
      }
    );
  }

  async ReportingErrorToast(reason) {
    const toast = await this.toastController.create({
      header: 'REPORTING FAILED',
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
      header: 'REPORTING COMPLETE',
      message: reason,
      position: 'bottom',
      color: 'success',
      duration: 5000,
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