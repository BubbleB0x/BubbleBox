import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Plugins } from '@capacitor/core';
import { Router } from '@angular/router';
import { async } from '@angular/core/testing';
import { ToastController } from '@ionic/angular';
const { Storage } = Plugins;
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
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
        async () => {
          /* ------- Implementazione per la basic Auth -------*/
  
          await Storage.set({
            key: 'username',
            value: this.loginForm.value.username
          });
  
          await Storage.set({
            key: 'reqBasicKey',
            value: btoa(this.loginForm.value.username + ':' + this.loginForm.value.password)
          });
  
          /* -------- Implementazione per le ApiKeys ----------------
                  Storage.set({
                    key: 'apiKey',
                    value: response.api_key
                  });
          
                  Storage.set({
                    key: 'name',
                    value: response.name
                  });
          
                  Storage.set({
                    key: 'id',
                    value: response.id
                  });
          
                  Storage.set({
                    key: 'reqKey',
                    value: btoa(response.id + ':' + response.name)
                  });
           --------------------------------------------------------*/
          // Faccio la pulizia dei campi della form di login
          this.loginForm.reset();
          // Reindirizzo alla home
          this.router.navigate(['/home']);
        }, (error) => {
          this.LoginErrorToast(error.error.error.reason);
          console.log(error);
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
