import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupComponent } from './signup/signup.component';
// import { LandingPageComponent } from './landing-page/landing-page.component';
import { PostCarComponent } from './post-car/post-car.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { UpdateComponent } from './update/update.component';

export const routes: Routes = [
    {path: 'login', component:LoginPageComponent},
    {path: 'signup', component:SignupComponent},
    {path: 'dashboard', component:DashboardComponent},
    {path: '', component:LoginPageComponent},
    {path: 'postcar', component:PostCarComponent},
    {path: 'home', component:DashboardComponent},
    {path: 'car/:id', component:CarDetailsComponent},
    {path: 'update/:id', component:UpdateComponent},

    

];