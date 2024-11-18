import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { routes } from '../app.routes';
import { Router } from '@angular/router';
import { elementAt } from 'rxjs';
interface Item {
  title: string;
  tag: string;
  description: string;
  image: string;
  returnedImage:string;

}
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent,CommonModule,HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  jumpTo(){
    this.router.navigate(['/car']);
  }
  items: any = []; 

  constructor(private httpClient: HttpClient, private router:Router) {}

  ngOnInit(): void {
    this.fetchItems();
  }
  handleUpdate(id:number){
      this.router.navigate(['/update/',id])
  }
  handleDelete(id:number){
      console.log(id);
      this.httpClient.delete("http://localhost:5555/api/car/delete/"+id).subscribe((data:any)=>{
        alert("Car Deleted Successfully");
        window.location.reload();
      });

  }
  handleView(id: number) {
    this.router.navigate(['/car',id])
    }
  

  fetchItems(): void {
    this.httpClient.get<Item[]>('http://localhost:5555/api/car/getCars')  
      .subscribe(
        (data) => {
          // console.log('Fetched data:', data);
          this.items = data.map(item => {
            if (item.returnedImage) {
              item.image = `data:image/jpeg;base64,${item.returnedImage}`;
            }
            return item;
          });
        },
        (error) => {
          console.error('Error fetching items:', error);
        
        }
      );
  }

}
