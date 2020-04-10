import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Plugins } from '@capacitor/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AccessToken } from '../../interfaces/apiKey/access_token';
import { stringify } from 'querystring';
const { Storage } = Plugins;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  err;
  
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router, public toastController: ToastController) {
  }

  ngOnInit() {
  }

  /**
   * Esecuzione login, recuperando le credenziali dalla loginForm
   */
  login() {

    if(this.isEmptyOrSpaces(this.loginForm.value.username) || this.isEmptyOrSpaces(this.loginForm.value.password)) {
      this.LoginErrorToast("Please enter Username and Password");
    } else {
      this.authService.login(this.loginForm.value).subscribe(
        async (result: AccessToken) => {

          // Memorizzo l'access token nello store per la persistenza
          await Storage.set({
            key: 'access_token',
            value: result.access_token
          });
  
          // Faccio la pulizia dei campi della form di login
          this.loginForm.reset();

          // Reindirizzo alla home
          this.router.navigate(['/home']);
        }, (error) => {
          this.err = stringify(error)

          this.LoginErrorToast(error.error.error);
        }
      );
    }
  }

  isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
}

  async LoginErrorToast(reason) {
    const toast = await this.toastController.create({
      header: 'LOG IN FAILED',
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

}
