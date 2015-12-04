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
using System.Windows.Interop;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace IMRobot
{
    /// <summary>
    /// MainWindow.xaml 的交互逻辑
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private void Initialize()
        {
            this.statusBarTime.Content = DateTime.Now;
        }


        private void WindowSize_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            ////最大化，向下还原
            if (this.WindowState.Equals(WindowState.Maximized))
            {
                this.WindowState = WindowState.Normal;
            }
            else if (this.WindowState.Equals(WindowState.Normal))
            {
                ////设置最大化为工作区的大小
                this.MaxHeight = SystemParameters.WorkArea.Height;
                this.Width = SystemParameters.WorkArea.Width;
                this.WindowState = WindowState.Maximized;
            }


        }

        /// <summary>
        /// 窗口最小化
        /// </summary>
        /// <param name="sender">对象</param>
        /// <param name="e">时间</param>
        private void MinimizedWindow_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            this.WindowState = WindowState.Minimized;
        }

        /// <summary>
        /// 关闭窗口，退出程序
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void CloseWindow_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            Application.Current.Shutdown();
        }

        /// <summary>
        /// 实现拖动窗体
        /// </summary>
        /// <param name="e"></param>
        protected override void OnMouseLeftButtonDown(MouseButtonEventArgs e)
        {
            base.OnMouseLeftButtonDown(e);

            // 获取鼠标相对标题栏位置
            Point position = e.GetPosition(this.TitleBar);

            // 如果鼠标位置在标题栏内，允许拖动
            if (e.LeftButton == MouseButtonState.Pressed)
            {
                if (position.X >= 0 && position.X < this.TitleBar.ActualWidth && position.Y >= 0 && position.Y < this.TitleBar.ActualHeight)
                {
                    this.DragMove();
                }
            }
        }
    }
}
