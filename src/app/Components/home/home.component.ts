import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Service/Test Service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  userRole!: any;
  showAll:boolean = true

  constructor(private authService:AuthService){}

  ngOnInit(){
    this.userRole = this.authService.getRole();
    if(this.userRole === 'Admin' || this.userRole === 'SuperAdmin'){
      this.showAll = true;
    } else {
      this.showAll = false;
    }
  }

}
