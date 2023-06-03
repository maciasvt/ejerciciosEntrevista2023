using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using back_ejercicios.Models;
using System.Web.Http.Cors;

namespace back_ejercicios.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "GET, POST, PUT")]
    public class reservacionController : ApiController
    {

        // POST: api/reservacion
        public bool Post([FromBody] Reservacion reservacion)
        {
            GestorReservacion gReservacion = new GestorReservacion();
            bool res = gReservacion.addReservacion(reservacion);

            return res;
        }

        [System.Web.Http.Route("api/reservacion/{paramOne}/{ParamTwo}")]
        public List<Reservacion> get(string paramOne, string paramTwo)
        {
                GestorReservacion gReservacion = new GestorReservacion();
                List<Reservacion> lista = new List<Reservacion>();
                lista = gReservacion.getReservacion(paramOne, paramTwo);        
                return lista;            
        }

        [System.Web.Http.Route("api/login/")]
        public bool Post([FromBody] Usuario usuario)
        {
            GestorReservacion gReservacion = new GestorReservacion();
            bool res = gReservacion.login(usuario);

            return res;
        }

        [System.Web.Http.Route("api/signup/")]
        public bool post([FromBody] Usuario usuario)
        {
            GestorReservacion gReservacion = new GestorReservacion();
            bool res = gReservacion.signup(usuario);

            return res;
        }

    }
}