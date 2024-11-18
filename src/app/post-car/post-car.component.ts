import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-car',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule,HttpClientModule],
  templateUrl: './post-car.component.html',
  styleUrl: './post-car.component.css'
})
export class PostCarComponent {
  jumpTo(){
    this.router.navigate(['/dashboard']);
  }
  data=new FormGroup({
    title: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    tag: new FormControl('',[Validators.required]),
    image: new FormControl()
  })
  constructor(private httpClient : HttpClient, private router:Router){}
  onImagePicked(event: any){
    const file = event.target.files[0]
    this.data.patchValue({image : file})
  }
  public handleSubmit() {
    
     const formdata = new FormData()
     formdata.append('image', this.data.get('image')?.value);
     formdata.append('title', this.data.get('title')?.value|| "");
     formdata.append('description', this.data.get('description')?.value|| "");
     formdata.append('tag', this.data.get('tag')?.value|| "");
    this.httpClient.post("http://localhost:5555/api/car/addCar",formdata).subscribe((data:any)=>{
      if(this.data.valid){
        alert("Car Added Successfully");
        this.router.navigate(['/dashboard']);
      
      
    }
    else{
      alert("Feilds Required");

    }
    })
  }
}
