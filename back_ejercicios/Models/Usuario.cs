using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
    
namespace back_ejercicios.Models
{
    public class Usuario
    {

        public string usuario { get; set; }

        public string contrasena { get; set; }

        public Usuario() { }

        public Usuario(string Usuario, string Contrasena)
        {
            usuario = Usuario;
            contrasena = Contrasena;
        }
    }
}
