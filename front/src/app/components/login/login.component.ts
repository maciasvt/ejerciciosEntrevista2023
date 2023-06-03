import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GuiaService } from 'src/app/services/guia.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario: string = "";
  password: string = "";
  messageError: string = "";


  constructor(public router: Router, public guiaService: GuiaService) {
  }
    //Al presionar el botón de iniciar sesión, llamar función que valida los campos de texto están llenos, 
    // se envían a la API y se valida si existe el usuario recibir la respuesta (usuario) y guardar los datos en el local storage
  ingresar() {
    if (this.validarCampos()) {
      let usuario = { "usuario": this.usuario, "contrasena": this.password };
      console.log(usuario);

      this.guiaService.postLogin(usuario).subscribe((res: any) => {

        if (res == true) {
          localStorage.setItem("usuario", JSON.stringify(usuario))
          this.redirectReservar();
        }
        else {
          alert("No es posible iniciar sesión, revise la información");
        }
      });
    }
  }

  //Navegar a pestaña de crear usuario
  crear() {
    this.router.navigate(["/signup"]);
  }

  //Validar si los campos de texto están llenos 
  validarCampos() {
    if (this.usuario.length <= 0) {
      this.messageError = "Ingresar usuario";
      return false;
    }

    if (this.password.length <= 0) {
      this.messageError = "Ingresar contraseña";
      return false;
    }
    this.messageError = ""
    return true;
  }

  //Redireccionar a página de reservar
  redirectReservar() {
    this.router.navigate(["/reservar"]);
  }
}
