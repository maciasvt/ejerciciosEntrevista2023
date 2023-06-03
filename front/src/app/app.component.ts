import { Component } from '@angular/core';
import { guia } from './models/guia';
import { GuiaService } from './services/guia.service';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public router:Router){
  }

  cerrarSesion(){
    localStorage.removeItem("usuario");
    this.router.navigate(["/login"]);
  }
}