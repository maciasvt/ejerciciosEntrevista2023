using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;

namespace back_ejercicios.Models
{
    public class GestorReservacion
    {
        string pass;
        public List<Reservacion> getReservacion(string sala, string fecha)
        {
            List<Reservacion> lista = new List<Reservacion>();
            string strConn = ConfigurationManager.ConnectionStrings["BDLocal"].ToString();

            using (SqlConnection conn = new SqlConnection(strConn))
            {
                conn.Open();
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "Reservacion_Dos";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@sala", sala);
                cmd.Parameters.AddWithValue("@fecha", fecha);
                SqlDataReader dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    string horario = dr.GetString(0).Trim();
                    string dia = dr.GetString(1).Trim();
                    string persona = dr.GetString(2).Trim();
                    Reservacion Reservacion = new Reservacion(horario, dia, persona);
                    lista.Add(Reservacion);
                }
                dr.Close();
                conn.Close();
            }
            return lista;
        }

        public bool addReservacion(Reservacion reservacion)
        {
            bool res = false;
            string strConn = ConfigurationManager.ConnectionStrings["BDLocal"].ToString();
            using (SqlConnection conn = new SqlConnection(strConn))
            {
                SqlCommand cmd = conn.CreateCommand();
                SqlDataAdapter adapter = new SqlDataAdapter(cmd);
                cmd.CommandText = "Reservacion_Add";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@sala", reservacion.sala);
                cmd.Parameters.AddWithValue("@horario", reservacion.horario);
                cmd.Parameters.AddWithValue("@fecha", reservacion.fecha);
                cmd.Parameters.AddWithValue("@persona", reservacion.persona);
                try
                {
                    conn.Open();
                    cmd.ExecuteNonQuery();
                    res = true;
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                    res = false;
                    throw;
                }
                finally
                {
                    cmd.Parameters.Clear();
                    conn.Close();
                }
                return res;
            }
        }

        public bool login(Usuario usuario)
        {
            string strConn = ConfigurationManager.ConnectionStrings["BDLocal"].ToString();

            using (SqlConnection conn = new SqlConnection(strConn))
            {
                conn.Open();
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "Usuario_Get";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@usuario", usuario.usuario);
                SqlDataReader dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    pass = dr.GetString(1).Trim();
                }
                dr.Close();
                conn.Close();
            }
            if (pass == usuario.contrasena)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public bool signup(Usuario usuario)
        {
            bool res = false;
            string strConn = ConfigurationManager.ConnectionStrings["BDLocal"].ToString();
            using (SqlConnection conn = new SqlConnection(strConn))
            {
                SqlCommand cmd = conn.CreateCommand();
                SqlDataAdapter adapter = new SqlDataAdapter(cmd);
                cmd.CommandText = "Usuario_Add";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@usuario", usuario.usuario);
                cmd.Parameters.AddWithValue("@pass", usuario.contrasena);

                try
                {
                    conn.Open();
                    cmd.ExecuteNonQuery();
                    res = true;
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);  
                    res = false;
                    //throw;
                }
                finally
                {
                    cmd.Parameters.Clear();
                    conn.Close();
                }
                return res;
            }

        }
    }
    }