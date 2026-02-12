import { Component, Input, signal } from '@angular/core';
import { RegisterComponent } from "../account/register/register.component";
import { User } from '../../types/user';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @Input({required : true}) usersFromApp : User[] = [];
 protected registerMode = signal(false);
 showRegister(value : boolean)
 {
  this.registerMode.set(value);
 }
}
