---
layout: post
tags: 漏洞 
---
## 概要

Meltdown/Spectre在2018年初被发现, 是比较有影响力的cpu漏洞。此次影响的漏洞主要为 2 个：Meltdown（熔断）对应编号恶意数据缓存加载 CVE-2017-5754 ，Spectre （幽灵）对应编号边界检查绕过 CVE-2017-5753 、分支目标注入 CVE-2017-5715 ，Meltdown 影响几乎所有的 Intel CPU（从1995年起）以及部分 ARM CPU。 Spectre 拥有更广的影响范围，Intel 、ARM、AMD 都受其影响。在 Meltdown 的情况下，一个恶意程序可以窥探操作系统的内存，并可读取自身无权限访问的数据。利用此漏洞低权限用户可以访问到本身无权限访问的内容，例如用户密码、加密密钥。Spectre 可以归纳为计算机上运行的两个程序可以相互监视，无视自身的安全界限。用户浏览器访问了含有 Spectre 的恶意利用程序，可能导致用户的帐号、密码泄漏。而在公共云服务器上，则可能打破界限，从一台虚拟机器获取到另一个用户的权限。

## 知识

#### 乱序执行

cpu的乱序执行一般都使用Tomasulo算法，包括

- Common Data Bus (CDB).
- Unified Reservation Station (Scheduler).
- Register Renaming (Reorder Buffer).

该算法虽然是乱序执行, 但是会顺序完成 (retire), 只有在retire后它的输出才会architectually visible (简单地说, 不影响程序逻辑), 但是没有architectually visible不等于没有影响, 当输出更新到reservation station后, 因为cdb的存在, 其他指令已经可以读到. 另外, 非常重要的一点, 异常只有在指令retire的时候才会触发, 对于上面的例子, 即使cpu已经检查到第一条指令没有访问权限, 也只能等到该指令retire时才会触发, 取决于该指令在ROB的位置, 可能马上触发也可能很久之后, ROB容量可以很容易做到比如192这个级别.![rob](C:\Users\longtao\Desktop\文档\markdown\pic\rob.jpg)

![rob (2)](C:\Users\longtao\Desktop\文档\markdown\pic\rob (2).jpg)

#### 预测执行

预测执行是 CPU 根据当前掌握的信息预测某个条件判断的结果，然后选择对应的分支提前执行。







## reference

1. https://mp.weixin.qq.com/s/tXlww13i_IDWKeXDig2X5Q