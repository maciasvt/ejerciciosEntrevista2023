using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace back_ejercicios.Models
{
    public class Guia
    {
        public int id_guia { get; set; }
        public string actualizacion { get; set; }
        public DateTime fecha { get; set; }
        public string comentario { get; set; }
    
    public Guia(){}

        public Guia(string Actualizacion, DateTime Fecha, string Comentario)
        {
            actualizacion = Actualizacion;
            fecha = Fecha;
            comentario = Comentario;
        }
    }
}