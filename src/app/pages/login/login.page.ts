import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Plugins } from '@capacitor/core';
import { Router } from '@angular/router';
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

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
  }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.loginForm.value).subscribe(

      (response) => {


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

        this.loginForm.reset();
        this.router.navigate(['/home']);
      },

      (error) => {
        console.log(error);
      });
  }

}
