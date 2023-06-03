using back_ejercicios.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace back_ejercicios.Controllers
{
    public class GuiaController : ApiController
    {
        // GET: api/Guia/5
        public List<Guia> Get(int id)
        {
            GestorGuia gGuia = new GestorGuia();
            return gGuia.getGuia1(id);
        }
    }
}
