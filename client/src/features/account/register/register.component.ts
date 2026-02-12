import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterCreds, User } from '../../../types/user';
import { AccountServiceService } from '../../../core/services/account-service.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
 //usersFromHome = input.required<User[]>();
 private accountService = inject(AccountServiceService) ;
 cancelRegister = output<boolean>();
protected creds = {} as RegisterCreds;
  register()
  {

    this.accountService.register(this.creds).subscribe({
      next : response=>{
        console.log(response);
        this.cancel();
      },
      error: error => console.log(error)
    })
    // console.log(this.creds);
  }
  cancel()
  {
    this.cancelRegister.emit(false);
  }
}
