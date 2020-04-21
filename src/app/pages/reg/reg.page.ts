import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.page.html',
  styleUrls: ['./reg.page.scss']
})
export class RegPage implements OnInit {

  valoriForm = [];
  year: number = new Date().getFullYear();

  val: string = '';
  error: string = '';
  registrationComplete: boolean = false;
  pwdPattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$";
  unamePattern = "^[a-z0-9_-]{6,15}$";
  fiscal = "^([A-Za-z]{6}[0-9lmnpqrstuvLMNPQRSTUV]{2}[abcdehlmprstABCDEHLMPRST]{1}[0-9lmnpqrstuvLMNPQRSTUV]{2}[A-Za-z]{1}[0-9lmnpqrstuvLMNPQRSTUV]{3}[A-Za-z]{1})$|([0-9]{11})$";
  date = "^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}[+-][0-9]{2}:[0-9]{2}";

  regForm = this.fb.group({
    name: ['', Validators.compose([Validators.maxLength(15), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
    surname: ['', Validators.compose([Validators.maxLength(15), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
    fiscal_code: ['', Validators.compose([Validators.pattern(this.fiscal), Validators.required])],
    gender: ['', Validators.required],
    username: ['', Validators.compose([Validators.maxLength(15), Validators.pattern(this.unamePattern), Validators.required])],
    email: ['', Validators.compose([Validators.email, Validators.required])],
    password: ['', Validators.compose([Validators.pattern(this.pwdPattern), Validators.required])],
    date: ['', Validators.compose([Validators.pattern(this.date), Validators.required])]
  });

  constructor(private authService: AuthService, private fb: FormBuilder, private toastController: ToastController, private router: Router) { }

  ngOnInit() {
  }
  isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
  }



  saveReg() {
    if (this.isEmptyOrSpaces(this.regForm.value.username) ||
      this.isEmptyOrSpaces(this.regForm.value.password) ||
      this.isEmptyOrSpaces(this.regForm.value.name) ||
      this.isEmptyOrSpaces(this.regForm.value.surname) ||
      this.isEmptyOrSpaces(this.regForm.value.email) ||
      this.isEmptyOrSpaces(this.regForm.value.fiscal_code) ||
      this.isEmptyOrSpaces(this.regForm.value.date) ||
      this.isEmptyOrSpaces(this.regForm.value.gender)) {
      Object.keys(this.regForm.controls).forEach(key => {
        this.val = this.regForm.get(key).value;
        if (this.val == '') {
          this.valoriForm.push(key);
        }
      });
      this.valoriForm.forEach(value => {
        this.error = this.error + value + " | ";
      });
      this.RegErrorToast("Please enter camps:  " + this.error);
      this.error = '';
      this.valoriForm = [];
      this.val = '';
    } else {
      console.log(this.regForm.value.password);
      this.authService.reg(this.regForm.value).subscribe((data) => {
        console.log("Thank you for registration!");
      });
      this.RegValidateToast("Thank you for registration! ");
      this.goBack();
    }

  }
  async RegErrorToast(reason) {
    const toast = await this.toastController.create({
      header: 'Registration FAILED',
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

  async RegValidateToast(reason) {
    const toast = await this.toastController.create({
      header: 'Registration COMPLETE',
      message: reason,
      position: 'bottom',
      color: 'success',
      duration: 3000,
      buttons: [
        {
          text: 'Done',
          role: 'registration',
          handler: () => {
            console.log('Done clicked');
          }
        }
      ]
    });
    toast.present();
  }

  goBack() {
    this.router.navigate(['/login']);
  }
}
