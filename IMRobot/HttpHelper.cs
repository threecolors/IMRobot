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
        public HttpClient client = new HttpClient();

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
