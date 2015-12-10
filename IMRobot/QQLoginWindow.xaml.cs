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
using System.Text.RegularExpressions;

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

        private HttpHelper httpHelper = new HttpHelper();

        private void Account_LostFocus(object sender, RoutedEventArgs e)
        {
            ////验证是否需要输入验证码
            string verAccountUrl = string.Format("https://ssl.ptlogin2.qq.com/check?regmaster=&pt_tea=1&pt_vcode=0&uin={0}&appid=522005705&js_ver=10141&js_type=1&login_sig=JY6zkbxK92OUp5F5mgRGZqWv1hlabR9B4pNFVX6OSrmPv3xnMBjc3SXb1tn7QxwP&u1=https%3A%2F%2Fmail.qq.com%2Fcgi-bin%2Flogin%3Fvt%3Dpassport%26vm%3Dwpt%26ft%3Dloginpage%26target%3D&r=0.7840790273621678", this.Account.Text);
            ////ptui_checkVC('0','!MDF','\x00\x00\x00\x00\x11\x94\xb1\xdb','e1180844a282b628cca5c4d111bdcf0fdb0a03806ce401647cc54a62dbd9548b03e57096340106246e93842a9bd6b1b70f75f5a00baca44e','0');
            string result = httpHelper.GetHttpResponseString(verAccountUrl);
            Regex regex = new Regex(@"(?<=')[^,]*?(?=')");
            MatchCollection mc = regex.Matches(result);
            if (mc == null || mc.Count == 0)
            {

            }
            else
            {
                switch (mc[0].Value)
                    {
                    case "0":
                        ////不需要验证码
                        break;
                    case "1":
                        ////需要验证码
                        string verImageUrl = string.Format("https://ssl.captcha.qq.com/getimage?uin={0}&aid=522005705&cap_cd=gF17HWOm90FqAvJdwqqxIU5wDm2XQ_NJYmbKRRPQQUcEMxJvK8fVBw**&0.9538131789304316",this.Account.Text);
                        this.verImage.Source = new BitmapImage(new Uri(verImageUrl));
                        break;
                    default:
                        break;
                }                
            }

        }
    }
}
