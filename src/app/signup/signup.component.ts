import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NavbarLogComponent } from '../navbar-log/navbar-log.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,HttpClientModule,NavbarLogComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  data = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  constructor(private httpClient : HttpClient, private router:Router){}
  public handleSubmit() {
    this.httpClient.post("http://localhost:5555/api/add",this.data.value).subscribe((data:any)=>{
      if(this.data.valid){
      alert("User Added");}
      else{
        alert("Feilds Required")
      }
    },error=>{
      alert("User Already Exists");
    })
  }
}
