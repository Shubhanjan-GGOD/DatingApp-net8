import { CommonModule, NgClass, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { NavComponent } from "../layout/nav/nav.component";
import { AccountServiceService } from '../core/services/account-service.service';
import { HomeComponent } from "../features/home/home.component";
import { User } from '../types/user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavComponent, RouterOutlet,NgClass],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  private accountService = inject(AccountServiceService);
  protected router = inject(Router);
 // http =inject(HttpClient);
  //title = 'DatingApp';
  //users:any;
  //protected users = signal<User[]>([]);
  ngOnInit(): void {
     // this.getUsers();
      //this.setCurrentUser();
  }
// setCurrentUser()
// {
//   const userString = localStorage.getItem('user');
//   if(!userString)  return;
//   const user = JSON.parse(userString);
//   this.accountService.currentUser.set(user);
// }

  // getUsers()
  // {
  //   this.http.get<User[]>('http://localhost:5000/api/users').subscribe({
  //     next: response=>this.users.set(response),
  //     error: error =>console.log(error),
  //     complete: ()=>console.log("Request has Completed")
  //    });
  // }
}
