using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMRobot
{
    public class LoginSuccessEventArgs : EventArgs
    {
        public HttpHelper HttpHelper
        {
            get; set;
        }

        public string Verifysession
        {
            get; set;
        }

        public string CodeString
        {
            get;set;
        }

        public string LogSuccessUrl
        {
            get
            {
                return logSuccessUrl;
            }

            set
            {
                logSuccessUrl = value;
            }
        }

        public string Account
        {
            get
            {
                return account;
            }

            set
            {
                account = value;
            }
        }

        private string logSuccessUrl = string.Empty;

        private string account = string.Empty;
    }
}
