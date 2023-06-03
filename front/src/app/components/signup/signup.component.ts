import { Component } from '@angular/core';
import { GuiaService } from 'src/app/services/guia.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  usuario:string="";
  password:string="";
  passwordConfirm:string="";
  messageError:string="";
  
  constructor(public guiaService: GuiaService, public router: Router) {
  }

  //Llamar API e ingresar datos de usuario y contraseña
  crear(){
    if(this.validarCampos()){
      let usuario = { "usuario": this.usuario, "contrasena": this.password };
      console.log(usuario);
      
      this.guiaService.postSignup(usuario).subscribe(res => {
        if (res) {
          alert("Usuario creado");
          this.router.navigate(["login"])
        }
        else {
          alert("Ocurrió algún error, revise la conexión o intente un nombre de usuario diferente");
        }
      })
        
    }
  }

  //Validar si los campos de texto están llenos y mandar mensajes de error
  validarCampos(){
    if(this.password!=this.passwordConfirm){
      this.messageError="Las contraseñas no coinciden";
      return false;
    }

    if (this.usuario.length <= 0) {
      this.messageError="Coloque un usuario";
      return false;
    }

    if (this.password.length <= 0) {
      this.messageError="Coloque una contraseña";
      return false;
    }

    if (this.passwordConfirm.length <= 0) {
      this.messageError="Confirme la contraseña";
      return false;
    }

    this.messageError=""; 
    return true;
  }

  //Regresar al login
  regresar(){
    this.router.navigate(["login"])
  }
}
