import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { NgIf } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, NgIf,BsDropdownModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
//  private accountservice = inject(AccountService);
    accountservice = inject(AccountService);
  
  model: any = {};

  login() {
    this.accountservice.login(this.model).subscribe({
      next: response => {
        console.log(response);
       
      },
      error: error => console.log(error)
    })

  }
  logout()
  {
    this.accountservice.logout();
  }

}
