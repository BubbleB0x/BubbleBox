import { UsersService } from 'src/app/services/users/users.service';

import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';
<<<<<<< HEAD
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

=======
import { FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
>>>>>>> adeb5eeb81433be603c76e6878088441ed1cafa1
@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.page.html',
  styleUrls: ['./reporting.page.scss'],
})
export class ReportingPage {

  symp = [];
  sym: any;
  bodyTemp: number = 36;

<<<<<<< HEAD
  constructor(private dataService: DataService, private fb: FormBuilder, private toastController: ToastController, private router: Router) {
=======
 
  
sym:any;
note:string='';

id:any;


  

  constructor(private dataService: DataService,private userService: UsersService, private fb: FormBuilder, private toastController: ToastController, private router: Router) { 
>>>>>>> adeb5eeb81433be603c76e6878088441ed1cafa1
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

<<<<<<< HEAD
      }
    });
=======
  async getId() {
    const result = await this.userService.getId();
    this.id=result["id"];
    
    
    
  }
>>>>>>> adeb5eeb81433be603c76e6878088441ed1cafa1

 insertNote(strin){
  this.note = strin.target.value;
  


 }

<<<<<<< HEAD
    if (this.symp.length != 0) {
      this.dataService.report(this.symp);


      this.ReportingValidateToast("Thank you for reporting! Your state has changed from healthy to symptomatic!");
      //this.goBack();
    }
    else {
      this.ReportingErrorToast("Please select one or press Cancel to return to the Home page!");
    }
=======
  async saveReporting(){
    await this.getId();

    this.symp.push(this.id);
    
>>>>>>> adeb5eeb81433be603c76e6878088441ed1cafa1


    this.symp = [];
  }
<<<<<<< HEAD

=======
  
});

if(this.note!=''){
  this.note="| Note:  "+this.note;
  this.symp.push(this.note);
} 

>>>>>>> adeb5eeb81433be603c76e6878088441ed1cafa1

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

<<<<<<< HEAD
=======

      if(this.symp.length!=1){

       

      this.dataService.report(this.symp)
       
        
        this.ReportingValidateToast("Thank you for reporting! Your state has changed from healthy to symptomatic!");
      
        this.goBack();
      
      }
      else{
        this.ReportingErrorToast("Please select one or press Cancel to return to the Home page!");
      }

     
    this.symp=[];

    
>>>>>>> adeb5eeb81433be603c76e6878088441ed1cafa1
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
