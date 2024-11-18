import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NavbarLogComponent } from "../navbar-log/navbar-log.component";

@Component({
  selector: 'login-page',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, RouterModule, NavbarLogComponent,NavbarLogComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  data = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  constructor(private httpClient : HttpClient, private router:Router){}
  public handleSubmit() {
    this.httpClient.post("http://localhost:5555/api/login",this.data.value).subscribe((data:any)=>{
      if(this.data.valid){
      
      if(data==true){
        this.router.navigate(['/home']);
      }
      else{
        alert("Wrong Details");
      }
    }
    else{
      alert("Feilds Required");

    }
    })
  }
}
