using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace back_ejercicios.Models
{
    public class Reservacion
    {
        public string horario { get; set; }
        public string fecha { get; set; }
        public string persona { get; set; }

        public string sala { get; set; }

        public Reservacion() { }

        public Reservacion(string Horario, string Fecha, string Persona)
        {
            horario = Horario;
            fecha = Fecha;
            persona = Persona;
        }

        public Reservacion(string Horario, string Fecha, string Persona, string Sala)
        {
            horario = Horario;
            fecha = Fecha;
            persona = Persona;
            sala = Sala;
        }
    }
}