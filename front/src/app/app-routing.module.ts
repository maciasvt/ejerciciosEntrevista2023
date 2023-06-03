import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuiaComponent } from './components/guia/guia.component';
import { ReservarComponent } from './components/reservar/reservar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  { path: 'guia', component: GuiaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'reservar',  component: ReservarComponent },
  { path: 'signup', component:SignupComponent},
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
