Sysprep程序是微软公司用来配置Microsoft Windows全新安装的一个工具，是为方便企业用户部署系统而设计的。

## Sysprep使用

1、程序位置为：“C:\Windows\System32\sysprep\sysprep.exe”，也可以通过运行“sysprep”，打开sysprep.exe封装工具。
[![image](https://www.xxshell.com/wp-content/uploads/2019/08/image_thumb-18.png)](https://www.xxshell.com/wp-content/uploads/2019/08/image-18.png)
[![image](https://www.xxshell.com/wp-content/uploads/2019/08/image_thumb-19.png)](https://www.xxshell.com/wp-content/uploads/2019/08/image-19.png)
[![image](https://www.xxshell.com/wp-content/uploads/2019/08/image_thumb-20.png)](https://www.xxshell.com/wp-content/uploads/2019/08/image-20.png)

2、运行sysprep.exe封装工具，打开后点击确定就可以进行封装。
如果勾选“通用”的话有什么作用？
如果勾选“通用”在初始化系统的时候后会多一个硬件和驱动重新识别和安装的过程。
一般是跨硬件进行操作系统迁移的时候才会勾选该按钮，就是让这次封装的系统能在其它不同硬件的计算机上运行。

关机选项可以根据我们需求进行配置，如果设置为重新启动，封装完成后会自动进行重启。
[![image](https://www.xxshell.com/wp-content/uploads/2019/08/image_thumb-21.png)](https://www.xxshell.com/wp-content/uploads/2019/08/image-21.png)
[![image](https://www.xxshell.com/wp-content/uploads/2019/08/image_thumb-22.png)](https://www.xxshell.com/wp-content/uploads/2019/08/image-22.png)

封装完成后就可以看到 欢迎界面了。

封装完成后你的操作系统配置与数据是不丢失的，包括windows激活与防火墙配置等。

## 为什么要使用Sysprep作用

微软的操作系统很早就开始使用安全标识符（SID）对计算机和用户进行识别。在域控环境中，分配给计算机账号的叫 Machine SID，分配给用户账户的是用户账户 SID。处于工作组计算机的 SID 是由算法生成的，除特殊账户外，其它用户的 SID 也是由算法生成的；而域中各对象的 SID 是由域范围的 SID 和具有唯一性的相对标识符 (RID) 连接组成，RID 是在创建安全主体时由域中的 RID Master 分配的。RID Master 的作用是：分配可用 RID 池给域内的 DC 以及防止对象的 SID 重复。

所以当你从一台主机克隆出多个 PC，或者使用同一虚拟机母板克隆出多台 VM 之后，其 SID 势必会相同，在加入域时会造成安全主体的识别混乱和加域失败等，通过Sysprep封装就可以解决该问题。

