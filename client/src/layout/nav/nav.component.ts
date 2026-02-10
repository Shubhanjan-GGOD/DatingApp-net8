import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountServiceService } from '../../core/services/account-service.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  private accountService = inject(AccountServiceService);
  protected creds : any = {};

  login(){
    this.accountService.login(this.creds).subscribe({
      next: result => console.log(result),
      error: error => alert(error.message)
    })
  }

}
