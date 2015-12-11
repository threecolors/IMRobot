using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Windows.Controls;
using System.Windows.Media.Imaging;

namespace IMRobot
{
    public class QQHelper
    {
        private HttpHelper httpHelper = new HttpHelper();

        private WebBrowser webBrowser = new WebBrowser();

        private string verifysession = string.Empty;

        private string qquin = string.Empty;

        public QQHelper()
        {
            webBrowser.Navigate(System.IO.Path.GetFullPath("webqq.html"));
        }

        /// <summary>
        /// 验证是否需要验证码
        /// </summary>
        /// <returns></returns>
        public bool CheckQQAccount(out BitmapImage image, string account)
        {
            image = null;
            ////验证是否需要输入验证码
            string verAccountUrl = string.Format("https://ssl.ptlogin2.qq.com/check?regmaster=&pt_tea=1&pt_vcode=0&uin={0}&appid=522005705&js_ver=10141&js_type=1&login_sig=JY6zkbxK92OUp5F5mgRGZqWv1hlabR9B4pNFVX6OSrmPv3xnMBjc3SXb1tn7QxwP&u1=https%3A%2F%2Fmail.qq.com%2Fcgi-bin%2Flogin%3Fvt%3Dpassport%26vm%3Dwpt%26ft%3Dloginpage%26target%3D&r=0.7840790273621678", account);
            ////ptui_checkVC('0','!MDF','\x00\x00\x00\x00\x11\x94\xb1\xdb','e1180844a282b628cca5c4d111bdcf0fdb0a03806ce401647cc54a62dbd9548b03e57096340106246e93842a9bd6b1b70f75f5a00baca44e','0');
            string result = httpHelper.GetHttpResponseString(verAccountUrl);
            Regex regex = new Regex(@"(?<=')[^,]*?(?=')");
            MatchCollection mc = regex.Matches(result);
            if (mc == null || mc.Count == 0)
            {
                ////验证出错
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
                        string verImageUrl = string.Format("https://ssl.captcha.qq.com/getimage?uin={0}&aid=522005705&cap_cd={1}&0.9538131789304316", account, mc[1]);
                        System.Drawing.Image img = httpHelper.GetHttpResponseImage(verImageUrl);
                        image = this.BitmapToBitmapImage((System.Drawing.Bitmap)img);
                        this.verifysession = httpHelper.handler.CookieContainer.GetCookies(new Uri(verImageUrl))["verifysession"].ToString();
                        break;
                    default:
                        break;
                }
            }
            return image != null;
        }

        /// <summary>
        /// 图片转换
        /// </summary>
        /// <param name="bitmap"></param>
        /// <returns></returns>
        private BitmapImage BitmapToBitmapImage(System.Drawing.Bitmap bitmap)
        {
            BitmapImage bitmapImage = new BitmapImage();

            using (System.IO.MemoryStream ms = new System.IO.MemoryStream())
            {
                bitmap.Save(ms, bitmap.RawFormat);
                bitmapImage.BeginInit();
                bitmapImage.StreamSource = ms;
                bitmapImage.CacheOption = BitmapCacheOption.OnLoad;
                bitmapImage.EndInit();
                bitmapImage.Freeze();
            }

            return bitmapImage;
        }

        public bool Login(string pwd, string verifiCode, string account)
        {
            ///获取密文
            string p = this.webBrowser.InvokeScript("QXWEncodePwd", new object[] { this.qquin, pwd, verifiCode }).ToString();
            string verAccountUrl = string.Format("https://ssl.ptlogin2.qq.com/login?u={0}&verifycode={1}&pt_vcode_v1=0&pt_verifysession_v1={2}&p={3}&pt_randsalt=0&u1=https%3A%2F%2Fmail.qq.com%2Fcgi-bin%2Flogin%3Fvt%3Dpassport%26vm%3Dwpt%26ft%3Dloginpage%26target%3D%26account%3D2949575&ptredirect=1&h=1&t=1&g=1&from_ui=1&ptlang=2052&action=11-23-1449812239662&js_ver=10141&js_type=1&login_sig=JY6zkbxK92OUp5F5mgRGZqWv1hlabR9B4pNFVX6OSrmPv3xnMBjc3SXb1tn7QxwP&pt_uistyle=25&aid=522005705&daid=4&", account, verifiCode, this,verifysession, p);
            string result = httpHelper.GetHttpResponseString(verAccountUrl);
            Regex regex = new Regex(@"(?<=')[^,]*?(?=')");
            MatchCollection mc = regex.Matches(result);

            return true;
        }
    }
}
