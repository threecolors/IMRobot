//-----------------------------------------------------------------------
// <copyright file="CommonCache.cs" company="517Na Enterprises">
// * Copyright (C) 2014 517Na科技有限公司 版权所有。
// * version : 2.0.50727.5485
// * author  : huanghongqin
// * FileName: CommonCache.cs
// * history : created by huanghongqin 2015-06-25 9:02:25 
// </copyright>
//-----------------------------------------------------------------------

namespace IMRobot
{
    using System;
    using System.Reflection;
    using System.Threading;
    using System.Web;
    using System.Web.Caching;

    /// <summary>
    /// 公共缓存类
    /// </summary>
    public class CommonCache
    {
        /// <summary>
        /// 退票参数锁
        /// </summary>
        private static object lockobj = new object();

        /// <summary>
        /// 客规锁
        /// </summary>
        private static object lockobjTicketRule = new object();

        /// <summary>
        /// 获取缓存对象
        /// </summary>
        /// <typeparam name="T">缓存实体对象</typeparam>
        /// <param name="dele">实体数据获取方法</param>
        /// <param name="cacheKey">缓存关键字</param>
        /// <param name="cacheDuration">缓存时间（分钟）</param>
        /// <param name="objs">实体数据获取参 </param>
        /// <returns>参数T </returns>
        public static T GetCacheData<T>(Delegate dele, string cacheKey, int cacheDuration, params object[] objs)
        {
            if (HttpRuntime.Cache.Get(cacheKey) != null)
            {
                return (T)HttpRuntime.Cache[cacheKey];
            }

            var methodInfo = dele.Method;

            var result = (T)methodInfo.Invoke(dele.Target, objs);

            if (result == null)
            {
                return (T)HttpRuntime.Cache[cacheKey];
            }

            var cacheTime = DateTime.Now.AddMinutes(cacheDuration);
            lock (cacheKey)
            {
                HttpRuntime.Cache.Add(cacheKey, result, null, cacheTime, Cache.NoSlidingExpiration, CacheItemPriority.NotRemovable, null);
            }
            return (T)HttpRuntime.Cache[cacheKey];
        }

        /// <summary>
        /// 设置退票参数对象
        /// </summary>
        /// <typeparam name="T">缓存实体对象</typeparam>
        /// <param name="dele">实体数据获取方法</param>
        /// <param name="cacheKey">缓存关键字</param>
        /// <param name="cacheDuration">缓存时间（分钟）</param>
        /// <param name="objs">实体数据获取参 </param>
        /// <returns>结果 </returns>
        public static bool SetRefundParamSetCacheData<T>(Delegate dele, string cacheKey, int cacheDuration, params object[] objs)
        {
            bool ret = true;
            if (Monitor.TryEnter(lockobj, 10000))
            {
                try
                {
                    if (HttpRuntime.Cache.Get(cacheKey) != null)
                    {
                        ret = true;
                        return ret;
                    }

                    var methodInfo = dele.Method;

                    var result = (T)methodInfo.Invoke(dele.Target, objs);

                    var cacheTime = DateTime.Now.AddMinutes(cacheDuration);

                    HttpRuntime.Cache.Add(cacheKey, result, null, cacheTime, Cache.NoSlidingExpiration, CacheItemPriority.NotRemovable, null);
                }
                catch (Exception ex)
                {
                    //AppException appex = new AppException("设置缓存错误：" + ex.Message, ex, ExceptionLevel.Error);
                    //LogManager.Log.WriteException(appex);
                    ret = false;
                }
                finally
                {
                    ////解除锁定
                    Monitor.Exit(lockobj);
                }

                ret = true;
            }
            else
            {
                //AppException appex = new AppException("设置缓存线程锁定超时", ExceptionLevel.Info);
                //LogManager.Log.WriteException(appex);
                ret = false;
            }

            return ret;
        }

        /// <summary>
        /// 获取缓存对象
        /// </summary>
        /// <param name="cacheKey">缓存关键字</param>
        /// <typeparam name="T">对象类型</typeparam>
        /// <returns>参数T </returns>
        public static T GetCacheData<T>(string cacheKey)
        {
            if (HttpRuntime.Cache.Get(cacheKey) != null)
            {
                return (T)HttpRuntime.Cache[cacheKey];
            }
            else
            {
                return default(T);
            }
        }

        /// <summary>
        /// 刷新缓存
        /// </summary>
        /// <param name="dele"></param>
        /// <param name="cacheKey"></param>
        /// <param name="cacheDuration"></param>
        /// <param name="objs"></param>
        /// <returns></returns>
        public static bool RefreshCache<T>(Delegate dele, string cacheKey, int cacheDuration, params object[] objs)
        {
            bool ret = true;
            if (Monitor.TryEnter(lockobj, 10000))
            {
                try
                {
                    if (HttpRuntime.Cache.Get(cacheKey) != null)
                    {
                        HttpRuntime.Cache.Remove(cacheKey);
                    }

                    var methodInfo = dele.Method;

                    var result = (T)methodInfo.Invoke(dele.Target, objs);

                    var cacheTime = DateTime.Now.AddMinutes(cacheDuration);

                    HttpRuntime.Cache.Add(cacheKey, result, null, cacheTime, Cache.NoSlidingExpiration, CacheItemPriority.NotRemovable, null);
                }
                catch (Exception ex)
                {
                    //AppException appex = new AppException("设置缓存错误：" + ex.Message, ex, ExceptionLevel.Error);
                    //LogManager.Log.WriteException(appex);
                    ret = false;
                }
                finally
                {
                    ////解除锁定
                    Monitor.Exit(lockobj);
                }

                ret = true;
            }
            else
            {
                //AppException appex = new AppException("设置缓存线程锁定超时", ExceptionLevel.Info);
                //LogManager.Log.WriteException(appex);
                ret = false;
            }

            return ret;
        }
    }
}
