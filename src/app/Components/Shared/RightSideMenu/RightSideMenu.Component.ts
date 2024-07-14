import { Component, OnInit } from '@angular/core';

import { InitialConstants } from '../../../Core/Constant/InitialConstant';

import { AuthService } from '../../../Service/Test Service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rightsidemenu',
  templateUrl: './RightSideMenu.Component.html',
  styleUrl: './RightSideMenu.component.css'
})

export class RightSideMenuComponent implements OnInit {

  userRole!: any;
  showAll:boolean = true

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(){
    this.userRole = this.authService.getRole();
    if(this.userRole === 'Admin' || this.userRole === 'SuperAdmin'){
      this.showAll = true;
    } else {
      this.showAll = false;
    }
  }

  logOut(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
