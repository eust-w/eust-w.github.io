---
layout: post
tags: 应用
---



1. sudo apt-get install mysql-server -y

2. 初始化配置

   ```shell
   
   ubuntu@VM-0-11-ubuntu:~$ sudo mysql_secure_installation
   
   Securing the MySQL server deployment.
   
   Connecting to MySQL using a blank password.
   
   VALIDATE PASSWORD PLUGIN can be used to test passwords
   and improve security. It checks the strength of password
   and allows the users to set only those passwords which are
   secure enough. Would you like to setup VALIDATE PASSWORD plugin?
   
   Press y|Y for Yes, any other key for No: N
   Please set the password for root here.
   
   New password:
   
   Re-enter new password:
   By default, a MySQL installation has an anonymous user,
   allowing anyone to log into MySQL without having to have
   a user account created for them. This is intended only for
   testing, and to make the installation go a bit smoother.
   You should remove them before moving into a production
   environment.
   
   Remove anonymous users? (Press y|Y for Yes, any other key for No) : N
   
    ... skipping.
   
   
   Normally, root should only be allowed to connect from
   'localhost'. This ensures that someone cannot guess at
   the root password from the network.
   
   Disallow root login remotely? (Press y|Y for Yes, any other key for No) : N
   
    ... skipping.
   By default, MySQL comes with a database named 'test' that
   anyone can access. This is also intended only for testing,
   and should be removed before moving into a production
   environment.
   
   
   Remove test database and access to it? (Press y|Y for Yes, any other key for No) : N
   
    ... skipping.
   Reloading the privilege tables will ensure that all changes
   made so far will take effect immediately.
   
   Reload privilege tables now? (Press y|Y for Yes, any other key for No) : Y
   Success.
   
   All done!
   
   ```

   