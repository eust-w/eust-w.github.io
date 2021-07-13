---
layout: post
tags: 工具
---



Swingbench is a free load generator (and benchmarks) designed to stress test an Oracle database (10g,11g,12c).

# 介绍

-   Swingbench组件：
    Swingbench是一个图形界面，用户可以编辑配置参数。可以显示实时的图形。
    Minibench是一个图形界面，可以显示简单的实时图形。
    Charbench是一个命令行的工具，有很多的命令行选项。
-   四种基准测试

| Benchmark      | 描述                               | 读写比例 | 备注                                                         |
| :------------- | :--------------------------------- | :------- | :----------------------------------------------------------- |
| Order Entry    | 经典的Order Entry基准测试。像TPC。 | 60/40    | TPC-C类似的，基于Oracle自带的两个Sample Schema：OE和SH       |
| Calling Circle | 电话公司自助系统                   | 70/30    | 基于电话自助服务系统的基准测试，大小相对固定，每次运行都需要重新生成schema |
| Stess Test     | 简单的INSERT/DELETE/UPDATE/SELECT  | 50/50    | Stress Test是最简单的测试，执行insert/update/delete/select的操作，数据是在运行时产生，可以用于测试TimesTen |
| Sales History  | DSS基准测试                        | 100/0    | 数据仓库基准测试，使用datagenerator产生数据，由disk和时间来决定最大的大小，基于Oracle自带的两个Sample Schema：OE和SH |

# 环境

-   Linux
-   Oracle Database 11

# 架构示意图

![swingbench_advance](http://172.20.18.38:5555/eus/v1/show/6500656c-5aef-11eb-9fab-fa1e86d74c00.png)![swingbench_simple](http://172.20.18.38:5555/eus/v1/show/665819b4-5aef-11eb-9549-fa1e86d74c00.png)



# 安装和设置

-   下载
    目前作者已经发布了最新的2.5版本，本次使用2.5。从dominicgiles.com下载，地址：http://dominicgiles.com/downloads.html。

-   验证Java版本
    2.4和2.5版本需要使用Java 6/7 JVM。

    ```
    #
    yum install -y java-1.7.0-openjdk.x86_64
    $
    java -version
    java version "1.7.0_65"
    ```

-   安装

    ```
    $
    pwd /home/oracle
    unzip swingbench25932.zip
    <略>
    cd swingbench
    pwd
    /home/oracle/swingbench
    ```

-   用户设置
    Unix/Linux平台配置文件为swingbench.env，执行文件路径为bin；Windows下则为swingbenchenv.bat和winbin。在windows平台上注意一定要配置ORACLE_HOME，好像不认注册表。
    Linux平台下，swingbench是在Oracle用户下执行，请确保它被设置在环境变量以下。

    ```
    $
    export ORACLE_BASE=/u01/app/oracle
    export ORACLE_HOME=$ORACLE_BASE/product/11.2.0/dbhome_1
    ```

# 使用

-   配置OE仓库

    ```
    $
    cd bin
    ./oewizard
    ```

1.按在欢迎屏幕[下一页]

2.选择Benchmark版本，此处选择版本2.0，然后按[下一页]

3.选择任务，选择“Create the Order Entry Schema（User,Tables,indexes,Data etc）”，然后按[下一页]

4.在数据库的详细信息界面，输入必要的信息，然后按[下一页]

5.在Schema Details界面输入所需信息，然后按[下一页]

6.在Database Options输入所需的信息，然后按[下一页]
可默认

7.大小细节，建议进入用户自定义，可以使用1GB按[下一步]。

8.最后，指定并行度，然后按[完成]

9.日志在一个单独的窗口中打开。

10.打开完成后的模式创建完成界面。并按[确定]退出。

-   测试

    ```
    $
    cd /home/oracle/swingbench/bin
    ./swingbench -cs //oracledb01/orcl112 -dt thin  -rt 0:05
    ```

# 测试中遇到的问题和解决方法

1.  生成AWR
    在测试开始时可以生成awr快照，但是结束时没有自动生成awr快照。可以运行下列
    语句手工生成：

    ```
    SQL>
    exec DBMS_WORKLOAD_REPOSITORY.CREATE_SNAPSHOT ;
    ```

2.  遇到等待事件
    resmgr:cpu quantum
    根据metalink的note禁止资源管理

    ```
    SQL>
    alter system set resource_manager_plan='' scope=both;
    ```

3.  运行swingbench, 没有显示cpu和disk的实时图形
    ./swingbench -cpuloc localhost 带选项-cpuloc，如果是2.4版本，可以指定hostname和用户密码

4.  遇到ora-03111错误
    查了metalink的note可以通过调节sdu来解决，不过有时还是会出现。
    (SDU = 16384)
    (TDU = 16384)