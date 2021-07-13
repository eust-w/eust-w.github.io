---
layout: post
tags: 应用
---



[toc]

#### centos下 Hive搭建（mysql、hadoop 、jdk）

[20210128 longtao.wu]

#### Mysql

1.  wget https://dev.mysql.com/get/mysql80-community-release-el7-3.noarch.rpm

2.  ```
    rpm -ivh mysql80-community-release-el7-3.noarch.rpm
    ```

3.  ```
    yum install mysql-community-server -y
    systemctl enable mysqld
    systemctl start mysqld
    grep 'temporary password' /var/log/mysqld.log #获得密码
    mysql -u root -p
    mysql> set global validate_password.policy=0;
    mysql> set global validate_password.length=1;
    mysql> alter user 'root'@'localhost' identified by 'password';
    firewall-cmd --zone=public --add-port=3306/tcp --permanent
    firewall-cmd --reload
    ```

完整脚本

```sh
wget https://dev.mysql.com/get/mysql80-community-release-el7-3.noarch.rpm
rpm -ivh mysql80-community-release-el7-3.noarch.rpm
yum install mysql-community-server -y
systemctl enable mysqld
systemctl start mysqld
grep 'temporary password' /var/log/mysqld.log #获得密码
mysql -u root -p
mysql> set global validate_password.policy=0;
mysql> set global validate_password.length=1;
mysql> alter user 'root'@'localhost' identified by 'password';
firewall-cmd --zone=public --add-port=3306/tcp --permanent
firewall-cmd --reload
```

#### hadoop安装

Hadoop的核心由3个部分组成：

  HDFS: Hadoop Distributed File System，分布式文件系统，hdfs还可以再细分为NameNode、SecondaryNameNode、DataNode。

  YARN: Yet Another Resource Negotiator，资源管理调度系统

  Mapreduce：分布式运算框架

1.安装jdk7或8（不支持11）

```shell
#下载
wget -O jdk-8u131-linux-x64.tar.gz --no-check-certificate --no-cookies --header "Cookie: oraclelicense=accept-securebackup-cookie" http://download.oracle.com/otn-pub/java/jdk/8u131-b11/d54c1d3a095b4ff2b6607d096fa80163/jdk-8u131-linux-x64.tar.gz

tar zxvf ~/jdk-8u131-linux-x64.tar.gz -C /usr/local/

# 配置环境
vi /etc/profile
#  后面添加
export JAVA_HOME=/usr/local/jdk1.8.0_131
export CLASSPATH=$CLASSPATH:$JAVA_HOME/lib/
export PATH=$PATH:$JAVA_HOME/bin

#重新加载配置
source /etc/profile

#验证
java -version
```

```shell
#下载hadoop
# wget https://downloads.apache.org/hadoop/common/hadoop-3.2.2/hadoop-3.2.2.tar.gz
wget http://mirror.bit.edu.cn/apache/hadoop/common/hadoop-2.10.1/hadoop-2.10.1.tar.gz
tar zxvf hadoop-2.10.1.tar.gz -C /usr/local/

#配置jdk
vi ${HADOOP_HMOE}/etc/hadoop/hadoop-env.sh
export JAVA_HOME=/usr/local/jdk1.8.0_131/

#设置伪分布模式（Pseudo-Distributed Operation）修改etc/hadoop/core-site.xml文件，增加配置（fs.defaultFS：默认文件系统名称）：
vi ${HADOOP_HMOE}/etc/hadoop/core-site.xml
<configuration>
    <property>
        <name>fs.defaultFS</name>
        <value>hdfs://localhost:9000</value>
    </property>
</configuration>

 # 修改etc/hadoop/hdfs-site.xml文件，增加配置（dfs.replication：文件副本数）：
 <configuration>
    <property>
        <name>dfs.replication</name>
        <value>1</value>
    </property>
</configuration>

#格式化文件系统
/usr/local/hadoop-2.10.1/bin/hdfs namenode -format

#启动NameNode和DataNode进程（启动hdfs）
/usr/local/hadoop-2.10.1/sbin/start-dfs.sh // 启动NameNode和DataNode进程
/usr/local/hadoop-2.10.1/sbin/stop-dfs.sh  // 关闭NameNode和DataNode进程

#查看HDFS验证成功
http://172.20.19.33:50070

#启动yarn
/usr/local/hadoop-2.10.1/sbin/start-yarn.sh
/usr/local/hadoop-2.10.1/sbin/stop-yarn.sh

#查看YARN
http://172.20.19.33:8088/

# 配置环境
vi /etc/profile
#  后面添加
export HADOOP_HOME=/usr/local/hadoop-2.10.1
export PATH=$PATH:$HADOOP_HOME/bin
#重新加载配置
source /etc/profile
```

#### Hive安装

```shell
# 下载
wget https://mirrors.tuna.tsinghua.edu.cn/apache/hive/hive-3.1.2/apache-hive-3.1.2-bin.tar.gz -c #比较慢，断点下载
tar zxvf apache-hive-3.1.2-bin.tar.gz -C /usr/local/

#改名去bin
mv apache-hive-3.1.2-bin/ apache-hive-3.1.2/

#配置
cd /usr/local/apache-hive-3.1.2/conf/
cp hive-log4j2.properties.template hive-log4j2.properties
vi /usr/local/apache-hive-3.1.2/conf/hive-site.xml

<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<?xml-stylesheet type="text/xsl" href="configuration.xsl"?>
<configuration>
  <property>
    <name>javax.jdo.option.ConnectionURL</name>
    <value>jdbc:mysql://172.20.19.33:3306/hive?createDatabaseIfNotExist=true</value>
　</property>
　<property>
    <name>javax.jdo.option.ConnectionDriverName</name>
　　<value>com.mysql.cj.jdbc.Driver</value>
  </property>
  <property>
    <name>javax.jdo.option.ConnectionUserName</name>
    <value>root</value>
  </property>
  <property>
    <name>javax.jdo.option.ConnectionPassword</name>
    <value>password</value>
  </property>
</configuration>

#初始化数据库
#下载并拷贝protobuf-java-3.6.1.jar和mysql-connector-java-8.0.17.jar到$HIVE_HOME/lib目录下，删除已有的protobuf-java-2.5.0.jar文件。统一hive和mysql服务的时区。
wget -c https://repo1.maven.org/maven2/com/google/protobuf/protobuf-java/3.6.1/protobuf-java-3.6.1.jar
wget -c https://repo1.maven.org/maven2/mysql/mysql-connector-java/8.0.17/mysql-connector-java-8.0.17.jar
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime # hive和mysql服务器都要执行，mysql要重启服务
cd /usr/local/apache-hive-3.1.2/bin/
/usr/local/apache-hive-3.1.2/bin/schematool -dbType mysql -initSchema # 报错需要修改mysql访问权限
/usr/local/apache-hive-3.1.2/bin/hive

#  启动hiveserver2：
# 修改$HADOOP_HOME/etc/hadoop/core-site.xml文件，增加如下配置：
vi /usr/local/hadoop-2.10.1/etc/hadoop/core-site.xml
<property>
        <name>hadoop.proxyuser.root.hosts</name>
        <value>*</value>
</property>
<property>
        <name>hadoop.proxyuser.root.groups</name>
        <value>*</value>
</property>
<property>
         <name>hadoop.proxyuser.hadoop.hosts</name>
        <value>*</value>
</property>
 <property>
         <name>hadoop.proxyuser.hadoop.groups</name>
         <value>*</value>
</property>

vi /usr/local/apache-hive-3.1.2/conf/hive-site.xml

  <property>
     <name>hive.server2.thrift.port</name>
     <value>10000</value>
  </property>
  <property>
     <name>hive.server2.thrift.bind.host</name>
     <value>172.20.19.33</value>
  </property>

/usr/local/apache-hive-3.1.2/bin/hiveserver2 &
```



mysql权限修改

```shell
# 改表法
mysql -u root -pvmware
mysql>use mysql;
mysql>update user set host = '%' where user = 'root';
mysql>flush privileges;
```



##### 注意

**Hive Shell 、Hive Web UI及JDBC 三种连接Hive Server的方式是互斥的，同一时刻只能用一种方式连接**







### 端口说明

| 组件      | Daemon            | 端口  | 配置                                                         | 说明                                                         |
| --------- | ----------------- | ----- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| HDFS      | DataNode          | 50010 | dfs.datanode.address                                         | datanode服务端口，用于数据传输                               |
|           |                   | 50075 | dfs.datanode.http.address                                    | http服务的端口                                               |
|           |                   | 50475 | dfs.datanode.https.address                                   | https服务的端口                                              |
|           |                   | 50020 | dfs.datanode.ipc.address                                     | ipc服务的端口                                                |
|           | NameNode          | 50070 | dfs.namenode.http-address                                    | http服务的端口                                               |
|           |                   | 50470 | dfs.namenode.https-address                                   | https服务的端口                                              |
|           |                   | 8020  | fs.defaultFS                                                 | 接收Client连接的RPC端口，用于获取文件系统metadata信息。      |
|           | journalnode       | 8485  | dfs.journalnode.rpc-address                                  | RPC服务                                                      |
|           |                   | 8480  | dfs.journalnode.http-address                                 | HTTP服务                                                     |
|           | ZKFC              | 8019  | dfs.ha.zkfc.port                                             | ZooKeeper FailoverController，用于NN HA                      |
| YARN      | ResourceManager   | 8032  | yarn.resourcemanager.address                                 | RM的applications manager(ASM)端口                            |
|           |                   | 8030  | yarn.resourcemanager.scheduler.address                       | scheduler组件的IPC端口                                       |
|           |                   | 8031  | yarn.resourcemanager.resource-tracker.address                | IPC                                                          |
|           |                   | 8033  | yarn.resourcemanager.admin.address                           | IPC                                                          |
|           |                   | 8088  | yarn.resourcemanager.webapp.address                          | http服务端口                                                 |
|           | NodeManager       | 8040  | yarn.nodemanager.localizer.address                           | localizer IPC                                                |
|           |                   | 8042  | yarn.nodemanager.webapp.address                              | http服务端口                                                 |
|           |                   | 8041  | yarn.nodemanager.address                                     | NM中container manager的端口                                  |
|           | JobHistory Server | 10020 | mapreduce.jobhistory.address                                 | IPC                                                          |
|           |                   | 19888 | mapreduce.jobhistory.webapp.address                          | http服务端口                                                 |
| HBase     | Master            | 60000 | hbase.master.port                                            | IPC                                                          |
|           |                   | 60010 | hbase.master.info.port                                       | http服务端口                                                 |
|           | RegionServer      | 60020 | hbase.regionserver.port                                      | IPC                                                          |
|           |                   | 60030 | hbase.regionserver.info.port                                 | http服务端口                                                 |
|           | HQuorumPeer       | 2181  | hbase.zookeeper.property.clientPort                          | HBase-managed ZK mode，使用独立的ZooKeeper集群则不会启用该端口。 |
|           |                   | 2888  | hbase.zookeeper.peerport                                     | HBase-managed ZK mode，使用独立的ZooKeeper集群则不会启用该端口。 |
|           |                   | 3888  | hbase.zookeeper.leaderport                                   | HBase-managed ZK mode，使用独立的ZooKeeper集群则不会启用该端口。 |
| Hive      | Metastore         | 9083  | /etc/default/hive-metastore中export PORT=<port>来更新默认端口 |                                                              |
|           | HiveServer        | 10000 | /etc/hive/conf/hive-env.sh中export HIVE_SERVER2_THRIFT_PORT=<port>来更新默认端口 |                                                              |
| ZooKeeper | Server            | 2181  | /etc/zookeeper/conf/zoo.cfg中clientPort=<port>               | 对客户端提供服务的端口                                       |
|           |                   | 2888  | /etc/zookeeper/conf/zoo.cfg中server.x=[hostname]:nnnnn[:nnnnn]，标蓝部分 | follower用来连接到leader，只在leader上监听该端口。           |
|           |                   | 3888  | /etc/zookeeper/conf/zoo.cfg中server.x=[hostname]:nnnnn[:nnnnn]，标蓝部分 | 用于leader选举的。只在electionAlg是1,2或3(默认)时需要。      |

www.longtao.fun