import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';




@Component({
  selector: 'app-reg',
  templateUrl: './reg.page.html',
  styleUrls: ['./reg.page.scss'],
  
  
})



export class RegPage implements OnInit {
  
  valoriForm = [];
  year: number= new Date().getFullYear();
  
  val: string='';
  error:string='';
  registrationComplete:boolean=false;


  regForm = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
     fiscal_code: ['', Validators.required],
   gender: ['', Validators.required],
    username: ['', Validators.required], 
    email:['', Validators.required],
    password: ['', Validators.required],
    date:['', Validators.required],
    
   
    
  });
  
  constructor(private authService: AuthService, private fb: FormBuilder, private toastController: ToastController, private router: Router) { 
    
  }

  ngOnInit() {
  }
  isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
}



saveReg(){
  if(this.isEmptyOrSpaces(this.regForm.value.username) || this.isEmptyOrSpaces(this.regForm.value.password) || this.isEmptyOrSpaces(this.regForm.value.name) || this.isEmptyOrSpaces(this.regForm.value.surname) || this.isEmptyOrSpaces(this.regForm.value.email) || this.isEmptyOrSpaces(this.regForm.value.fiscal_code) || this.isEmptyOrSpaces(this.regForm.value.date)||this.isEmptyOrSpaces(this.regForm.value.gender) ) {
    
    Object.keys(this.regForm.controls).forEach(key => {
      
      this.val=this.regForm.get(key).value;
         

     if(this.val==''){
     
      this.valoriForm.push(key);
     }
      
    });

   

    this.valoriForm.forEach(value =>{

      this.error=this.error+value+" | ";

      


    });

  
    this.RegErrorToast("Please enter camps:  "+this.error);
    this.error='';
    this.valoriForm=[];
    this.val='';
  
  } else {
    
    this.authService.reg(this.regForm.value).subscribe((data)=>{
     console.log("Thank you for registration!");

    }

   );
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
        role: 'login',
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
