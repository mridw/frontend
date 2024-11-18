import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
interface Item {
  title: string;
  tag: string;
  description: string;
  image: string;
  returnedImage:string;

}

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [NavbarComponent,RouterLink,HttpClientModule,CommonModule],
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.css'
})
export class CarDetailsComponent {
  carId: number = 0;
  car: any = null; 

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.carId = +this.route.snapshot.paramMap.get('id')!;
    this.fetchCarDetails();
  }

  fetchCarDetails(): void {
    this.httpClient.get(`http://localhost:5555/api/car/${this.carId}`).subscribe(
      (data: any) => {
        this.car = data; 
        if (this.car.returnedImage) {
          this.car.image = `data:image/jpeg;base64,${this.car.returnedImage}`;
        }
      },
      (error) => {
        console.error('Error fetching car details:', error);
      }
    );
  }
  }
  
