using System;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
using System.Data.SqlClient;

namespace back_ejercicios.Models
{

    public class GestorGuia
    {            
        public List<Guia> getGuia1(int id)
        {

            List<Guia> lista = new List<Guia>();
            string strConn = ConfigurationManager.ConnectionStrings["BDLocal"].ToString();

            using (SqlConnection conn = new SqlConnection(strConn))
            {
                conn.Open();

                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "Guia_Get";
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@guia", id);
                SqlDataReader dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    string actualizacion = dr.GetString(0).Trim();
                    DateTime fecha = dr.GetDateTime(1);
                    string comentario = dr.GetString(2).Trim();

                    Guia Guia = new Guia(actualizacion, fecha, comentario);
                    Console.WriteLine(Guia);
                    lista.Add(Guia);
                }
                dr.Close();
                conn.Close();

            }
            return lista;
        }


    }
}