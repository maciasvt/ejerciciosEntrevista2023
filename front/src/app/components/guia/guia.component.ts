import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { GuiaService } from 'src/app/services/guia.service';

@Component({
  selector: 'app-guia',
  templateUrl: './guia.component.html',
  styleUrls: ['./guia.component.css']
})
export class GuiaComponent {
  test:string="";
  datatable:any=[];

  constructor(public guiaService:GuiaService){
  }

  //Al presionar el botón llamamos al método que llama al servicio
  clickButton(){
    console.log(this.test);
    this.onDataTable2();
  }

  //Servicio para llenar la tabla
  onDataTable2(){
    this.guiaService.getGuia1(this.test).subscribe((res: any)  => {
      this.datatable=res;
      console.log(res);     
    });
  }
}