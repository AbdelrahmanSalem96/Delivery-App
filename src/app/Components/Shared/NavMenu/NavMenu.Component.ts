import { Component,Inject ,OnInit } from '@angular/core';

import { InitialConstants } from '../../../Core/Constant/InitialConstant';
import { AuthService } from '../../../Service/Test Service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navmenu',
  templateUrl: './NavMenu.Component.html',
  styleUrl: './NavMenu.Component.css'
})
export class NavmenuComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {}

  logOut(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
