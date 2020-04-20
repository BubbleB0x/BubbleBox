import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  listIndex = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  selectItem(index) {
    this.listIndex = index;
  }

  redirect(route) {
    this.router.navigate([route])
  }

}
