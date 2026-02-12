import { Component, inject, signal, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountServiceService } from '../../core/services/account-service.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastServiceService } from '../../core/services/toast-service.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule,RouterLink,RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  protected accountService = inject(AccountServiceService);
  protected creds : any = {};
  private router = inject(Router);

  private toast = inject(ToastServiceService);

  login(){
    this.accountService.login(this.creds).subscribe({
      next: () => {//console.log(result);
         this.router.navigateByUrl('/members');
         this.toast.success('logged in successfully')
        this.creds = [];
      },
      error: error => {
        this.toast.error(error.error);
      }
    })
  }
  logout(){
   // this.accountService.logout();
  
    this.accountService.logout();
     this.router.navigateByUrl('/');
  }

}
