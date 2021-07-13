---
layout: post
tags: python 
---
![closerange(py2vspy3)](C:\Users\longtao\Desktop\文档\markdown\pic\closerange(py2vspy3).png)

## file descriptors（/proc下）

文件描述符在形式上是一个非负整数。实际上，它是一个索引值，指向[内核](https://zh.wikipedia.org/wiki/内核)为每一个[进程](https://zh.wikipedia.org/wiki/进程)所维护的该进程打开文件的记录表。当程序打开一个现有文件或者创建一个新文件时，内核向进程返回一个文件描述符。在[程序设计](https://zh.wikipedia.org/wiki/程序设计)中，一些涉及底层的程序编写往往会围绕着文件描述符展开。但是文件描述符这一概念往往只适用于[UNIX](https://zh.wikipedia.org/wiki/UNIX)、[Linux](https://zh.wikipedia.org/wiki/Linux)这样的操作系统。

### 优点

文件描述符的优点主要有两个：

- 基于文件描述符的[I/O操作](https://zh.wikipedia.org/wiki/I/O)兼容[POSIX](https://zh.wikipedia.org/wiki/POSIX)标准。
- 在UNIX、Linux的系统调用中，大量的系统调用都是依赖于文件描述符

此外，在Linux系列的操作系统上，由于Linux的设计思想便是把一切设备都视作文件。因此，文件描述符为在该系列平台上进行设备相关的编程实际上提供了一个统一的方法。

### 缺点

文件描述符的概念存在两大缺点：

- 在非UNIX/Linux [操作系统](https://zh.wikipedia.org/wiki/操作系统)上（如[Windows](https://zh.wikipedia.org/wiki/Windows)），无法基于这一概念进行编程——事实上，Windows下的文件描述符和[信号量](https://zh.wikipedia.org/wiki/信号量)、[互斥锁](https://zh.wikipedia.org/wiki/互斥锁)等[内核对象](https://zh.wikipedia.org/wiki/内核对象)一样都记作HANDLE。
- 由于文件描述符在形式上不过是个整数，当代码量增大时，会使编程者难以分清哪些整数意味着数据，哪些意味着文件描述符。因此，完成的代码可读性也就会变得很差，这一点一般通过消除[魔术数字](https://zh.wikipedia.org/wiki/魔術數字)来解决。







## 知识点

1. 在proc目录下，以数字命名的目录表示当前一个运行的进程，目录名即为进程的pid，进程里的fd是文件描述符。
2. 魔术数字（magic number）是程式设计中所谓的直接写在程式码里的具体数值（如“10”“123”等以数字直接写出的值）。虽然程式作者写的时候自己能了解数值的意义，但对其他程式员而言，甚至制作者本人经过一段时间后，会难以了解这个数值的用途，只能苦笑讽刺“这个数值的意义虽然不懂，不过至少程式会动，真是个魔术般的数字”而得名。