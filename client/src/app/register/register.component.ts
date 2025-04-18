import { Component, EventEmitter, inject, Input, input, Output, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private accountService = inject(AccountService);
  private toastr = inject(ToastrService);
 // @Input() usersFromHomecomponent :any;
// usersFromHomecomponent =input.required<any>();
// @Output() cancelRegister = new EventEmitter();
cancelRegister = output<boolean>();
  model : any={};
  // register(){
  //   console.log(this.model);
  // }
  cancel(){
    this.cancelRegister.emit(false);
    console.log("cancelled");
  }
  register()
  {
    this.accountService.Register(this.model).subscribe({
      next: response =>{
        console.log(response);
        this.cancel();
      },
      error: error =>this.toastr.error(error.error)
    })
  }
}
