import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../core/service/users.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home-app',
  templateUrl: './home-app.component.html',
  styleUrls: ['./home-app.component.css']
})
export class HomeAppComponent implements OnInit {

  constructor(private usersService: UsersService
    , private router: Router
  ) { }

  ngOnInit(){
    //this.getUserLogged();
  }

  getUserLogged(){
    //this.usersService.getUser().subscribe((user)=>{
    //  console.log(user);
    //});
  }
 irAStatistics(){
  this.router.navigate(['/statistics']);
}
}
