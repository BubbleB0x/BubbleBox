import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  isStatusBarLight = false

  healtState = [
    "Sound",
    "Symptoms",
    "Quarantine",
    "Positive",
    "Positive/Asy"
  ]

  color = [
    "primary",
    "tertiary",
    "warning",
    "danger",
    "danger"
  ]

  hsIndex = 5;

  constructor(private usersService: UsersService) {
  }

  ngOnInit() {
    this.refreshState()
    setInterval(()=> { this.refreshState() }, 600000);
  }

  async refreshState() {
    const result = await this.usersService.getHealtState();
    console.log(result["hs"])
    switch(result["hs"]) {
      case "H" : this.hsIndex = 0; break;
      case "S": this.hsIndex = 1; break;
      case "Q": this.hsIndex = 2; break;
      case "P": this.hsIndex = 3; break;
      case "PA": this.hsIndex = 4; break;
      default: this.hsIndex = 5;
    }
  }

}

