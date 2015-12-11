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

        private void Account_LostFocus(object sender, RoutedEventArgs e)
        {
            BitmapImage image = new BitmapImage();
            if (qqHelper.CheckQQAccount(out image, this.Account.Text))
            {
                this.verImage.Source = image;
            }
        }



        private void Login_Click(object sender, RoutedEventArgs e)
        {
            this.qqHelper.Login(this.pawd.Text, this.verCode.Text, this.Account.Text);
        }

        private void Cancle_Click(object sender, RoutedEventArgs e)
        {

        }
    }
}
