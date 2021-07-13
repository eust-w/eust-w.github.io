---
layout: post
tags: 前端
---



1. antd  是[react ](https://www.html.cn/create-react-app/)UI 组件库 
2. 使用 `npx create-react-app 项目名（项目名不能为大写字母）`yarn create  react-app 项目名`
3. `npm start`  `yarn start`
4. `yarn test` 测试
5. package-lock.json文件锁定所有模块的版本号，包括主模块和所有依赖子模块。 当你执行npm install的时候，node从package.json文件读取模块名称，从package-lock.json文件中获取版本号，(类似 go.mod 和 go.sum )
6. Webpack 只处理 `src` 中的文件。 你需要**将任何 JS 和 CSS 文件放在 `src` 中**，否则 Webpack 将发现不了它们。webpack 是react的前端打包工具









#### ajax

1. AJAX = Asynchronous JavaScript and XML（异步的 JavaScript 和 XML）

2. AJAX 最大的优点是在不重新加载整个页面的情况下，可以与服务器交换数据并更新部分网页内容。

3. AJAX 不需要任何浏览器插件，但需要用户允许JavaScript在浏览器上执行。

4. 如需将请求发送到服务器，我们使用 **XMLHttpRequest** 对象的 **open()** 和 **send()** 方法：

   ```
   xmlhttp.open("GET","ajax_info.txt",true);
   xmlhttp.send();
   ```

5. 如需使用 async=false，请将 open() 方法中的第三个参数改为 false：

   ```
   xmlhttp.open("GET","test1.txt",false);
   ```

   我们不推荐使用 async=false，但是对于一些小型的请求，也是可以的。

   请记住，JavaScript 会等到服务器响应就绪才继续执行。如果服务器繁忙或缓慢，应用程序会挂起或停止。

[!https://www.html.cn/create-react-app/docs]: 
[https://www.html.cn/create-react-app/docs]: 