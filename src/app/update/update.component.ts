import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [NavbarComponent,HttpClientModule,RouterLink,ReactiveFormsModule,CommonModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit{
  jumpTo(){
    this.router.navigate(['/dashboard']);
  }
  carId: number = 0;
  carImageUrl: string | ArrayBuffer | null = null; // For storing the object URL of the image

  dataForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    tag: new FormControl('', [Validators.required]),
    image: new FormControl()
  });

  constructor(private httpClient: HttpClient, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.carId = +this.route.snapshot.paramMap.get('id')!;
    this.fetchCarDetails();
  }

  // Fetch car details by ID
  fetchCarDetails(): void {
    this.httpClient.get(`http://localhost:5555/api/car/${this.carId}`, { responseType: 'json' }).subscribe(
      (data: any) => {
        console.log('Fetched car details:', data);
        this.dataForm.setValue({
          title: data.title,
          description: data.description,
          tag: data.tag,
          image: null 
        });

       
        if (data.image) {
          this.convertBlobToImage(data.image);
        }
      },
      (error) => {
        console.error('Error fetching car details:', error);
        alert('Error fetching car details!');
      }
    );
  }

 
  convertBlobToImage(imageBlob: Blob): void {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.carImageUrl = reader.result; 
    };
    reader.readAsDataURL(imageBlob); 
  }


  public handleSubmit(): void {
    if (this.dataForm.invalid) {
      alert('Please fill all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('title', this.dataForm.get('title')?.value || '');
    formData.append('description', this.dataForm.get('description')?.value || '');
    formData.append('tag', this.dataForm.get('tag')?.value || '');

    const imageFile = this.dataForm.get('image')?.value;
    if (imageFile) {
      formData.append('image', imageFile, imageFile.name); 
    }

    this.httpClient.put(`http://localhost:5555/api/car/update/${this.carId}`, formData).subscribe(
      (response: any) => {
        console.log('Car updated successfully:', response);
        alert('Car updated successfully!');
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Error updating car:', error);
        alert('Failed to update car. Please try again.');
      }
    );
  }
}