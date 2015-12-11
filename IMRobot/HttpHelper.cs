using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace IMRobot
{
    public class HttpHelper
    {
        public HttpClientHandler handler = new HttpClientHandler();

        public HttpClient client;

        public HttpHelper()
        {
            handler.UseCookies = true;
            client = new HttpClient(handler);
        }

       

        public string GetHttpResponseString(string requestUri)
        {
            return client.GetStringAsync(requestUri).Result;
        }

        public Image GetHttpResponseImage(string requestUri)
        {
            return Image.FromStream(client.GetStreamAsync(requestUri).Result);
        }
    }
}
