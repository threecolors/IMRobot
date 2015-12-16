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
using System.Net;

namespace IMRobot
{
    /// <summary>
    /// QQLoginWindow.xaml 的交互逻辑
    /// </summary>
    public partial class QQLoginWindow : Window
    {
        /// <summary>
        /// 事件的方式 在窗口间传递参数
        /// </summary>
        public delegate void LoginSuccessHandler(object sender, LoginSuccessEventArgs e);
        public event LoginSuccessHandler LoginSuccessEvent;


        private QQHelper qqHelper = new QQHelper();

        public QQLoginWindow()
        {
            InitializeComponent();
        }

        /// <summary>
        /// 账号框失去焦点，验证账号
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void Account_LostFocus(object sender, RoutedEventArgs e)
        {
            BitmapImage image = new BitmapImage();
            if (qqHelper.CheckQQAccount(out image, this.Account.Text))
            {
                this.verImage.Source = image;
            }
        }


        /// <summary>
        /// 登录
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void Login_Click(object sender, RoutedEventArgs e)
        {
            string loginStr = this.qqHelper.Login(this.pawd.Text, this.verCode.Text, this.Account.Text);

            if (loginStr.Contains("成功"))
            {
                CommonCache.SetRefundParamSetCacheData<HttpHelper>(new Func<HttpHelper>(() => { return this.qqHelper.httpHelper; }), this.Account.Text, 30, null);
                //LoginSuccessEvent(this, new LoginSuccessEventArgs() { Account = this.Account.Text, LogSuccessUrl = this.qqHelper.logSuccessUrl, HttpHelper=this.qqHelper.httpHelper });
                //CookieCollection cookieCollection = this.qqHelper.httpHelper.handler.CookieContainer.GetCookies(new Uri(this.qqHelper.logSuccessUrl));
            }
            else
            {
                this.verImage.Source = null;
            }
        }

        /// <summary>
        /// 取消
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void Cancle_Click(object sender, RoutedEventArgs e)
        {

        }
    }
}
