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
                Func<QQHelper> func = () => { return this.qqHelper; };
                CommonCache.SetRefundParamSetCacheData<QQHelper>(new Func<QQHelper>(() => { return this.qqHelper; }), this.Account.Text, 30, null);
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
