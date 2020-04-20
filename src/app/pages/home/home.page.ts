
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

reported:any;
  constructor(private userService: UsersService) {
   
    
 
  }

  ngOnInit() {
    
    
   
  }
  ionViewDidEnter(){
    this.getR();
  }
 

   async getR() {
    const result = await this.userService.getR();
    console.log("result     ",result);
    this.reported=result;
  }
 
}

