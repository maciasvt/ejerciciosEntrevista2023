import { Component, OnDestroy, OnInit } from '@angular/core';
import { GuiaService } from 'src/app/services/guia.service';
import { Reservacion } from 'src/app/models/reservacion';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css']
})

export class ReservarComponent implements OnDestroy, OnInit {
  //Inicializar variables
  reservacion: Reservacion = new Reservacion();
  sala: string = "sala1";
  fecha: string = this.formatDate();
  horario: string = "";
  persona: string = "";
  res: any = [];
  datatable: any = [];
  myArray: string[][] = [];
  messageError: string = "";
  //Array para obtener los horarios en los que no hay reservación en la fecga seleccionada
  horariosDisponibles: any = [];
  horarioOcupados: any = [];
  personaOcupados: any = [];
  //Array con los hoarios para hacer la resta
  horarios: any[] = ["8-9",
    "9-10",
    "10-11",
    "11-12",
    "12-13",
    "13-14",
    "14-15",
    "15-16",
    "16-17",
    "17-18"];
  //Array con fomato horario, status, persona
  arrayDia: any[] = [{ horario: "8-9", status: false, persona: null },
  { horario: "9-10", status: false, persona: null },
  { horario: "10-11", status: false, persona: null },
  { horario: "11-12", status: false, persona: null },
  { horario: "12-13", status: false, persona: null },
  { horario: "13-14", status: false, persona: null },
  { horario: "14-15", status: false, persona: null },
  { horario: "15-16", status: false, persona: null },
  { horario: "16-17", status: false, persona: null },
  { horario: "17-18", status: false, persona: null }
  ]

  constructor(public guiaService: GuiaService, public router: Router) {
    this.redirectLogin();
  }


  ngOnInit() {
  }

  ngOnDestroy() {
    localStorage.removeItem("usuario");
  }

  redirectLogin() {
    if (!localStorage.getItem("usuario")) {
      this.router.navigate(["login"])
    }
    else {
      alert("Sesión iniciada");
      let x = JSON.parse(localStorage.getItem("usuario")!);
      this.persona = x.usuario;
    }

  }

  //Métodos para inicializar el select de fecha con el día actual
  padTo2Digits(num: any) {
    return num.toString().padStart(2, '0');
  }

  formatDate() {
    let date = new Date()
    return [
      date.getFullYear(),
      this.padTo2Digits(date.getMonth() + 1),
      this.padTo2Digits(date.getDate()),
    ].join('-');
  }

  //Método de botón verificar, hace un get basandose en la sala y la fecha para dar los horarios disponibles y colocar en el select
  verificarButton() {
    console.log(this.sala);
    console.log(this.fecha);
    //Servicio que regresa la tabla
    this.guiaService.getReservacion(this.sala, this.fecha).subscribe((res: any) => {
      this.datatable = res;
      console.log(res);
      //Llenar array con el formato de horario, status, persona
      this.datatable.forEach((element: any) => {
        const resultado = this.arrayDia.find(res => res.horario == element.horario)
        if (resultado != undefined) {
          resultado.persona = element.persona;
          resultado.status = true;
        }
        console.log(resultado)
      });
      console.log(this.arrayDia)

      //Tomar los horarios reservados del día, restarlos a los horarios disponibles y colocarlos en el select de hoario
      this.horarioOcupados = res.map((x: { horario: any; }) => x.horario);
      this.horarioOcupados.sort((a: string, b: string) => this.horarios.indexOf(a) - this.horarios.indexOf(b));
      this.personaOcupados = res.map((x: { persona: any; }) => x.persona);
      this.personaOcupados.sort((a: string, b: string) => this.horarios.indexOf(a) - this.horarios.indexOf(b));
      this.horariosDisponibles = this.horarios.filter(item => !this.horarioOcupados.includes(item));
      console.log(this.horariosDisponibles);
    });
  }
  //Método para apartar sala
  apartarButton(reservacion: Reservacion) {
    if (this.horario.length <= 0) {
      this.messageError="Selcciona un horario disponible";
    }
    else {
      this.messageError="";
      console.log(this.sala);
      console.log(this.fecha);
      console.log(this.horario);
      console.log(this.persona);

      var val = {
        sala: this.sala,
        fecha: this.fecha,
        horario: this.horario,
        persona: this.persona
      };

      //Llamando al servicio y su mensaje de confirmación
      this.guiaService.addReservacion(val).subscribe(res => {
        if (res) {
          alert("La sala ha sido apartada");
        }
        else {
          alert("Ocurrió algún error");
        }
        this.verificarButton();
      })
    }
  }

  cerrarSesion(){
    localStorage.removeItem("usuario");
    this.router.navigate(["/login"]);
  }
}
