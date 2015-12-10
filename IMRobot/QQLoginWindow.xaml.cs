using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;
using System.Configuration;

namespace IMRobot
{
    /// <summary>
    /// QQLoginWindow.xaml 的交互逻辑
    /// </summary>
    public partial class QQLoginWindow : Window
    {
        public QQLoginWindow()
        {
            InitializeComponent();
        }

        private void Account_LostFocus(object sender, RoutedEventArgs e)
        {
            ////验证是否需要输入验证码
            string verAccountUrl = string.Format("https://ssl.ptlogin2.qq.com/check?regmaster=&pt_tea=1&pt_vcode=0&uin={0}&appid=522005705&js_ver=10141&js_type=1&login_sig=JY6zkbxK92OUp5F5mgRGZqWv1hlabR9B4pNFVX6OSrmPv3xnMBjc3SXb1tn7QxwP&u1=https%3A%2F%2Fmail.qq.com%2Fcgi-bin%2Flogin%3Fvt%3Dpassport%26vm%3Dwpt%26ft%3Dloginpage%26target%3D&r=0.7840790273621678", this.Account);
            //string result = new HttpHelper().GetHttpResponse(verAccountUrl);
        }
    }
}
