---
layout: post
tags: 数据库
---



# 数据库的自动提交autocommit问题

一般情况下，oracle数据库本身默认不设置自动提交（或设置自动提交为false），mysql数据库本身默认设置自动提交（或设置自动提交为true）。若mysql数据库已设置自动提交，此时，我们在代码里还去主动commit，则会报错Can't call commit when autocommit=true。

该问题对rollback有同样的影响（Can't call callback when autocommit=true）。

解决方案：

一般情况下，不管哪种数据库，可以在代码里不去设置自动提交为true或false（不去主动connection.setAutoCommit(bool)）,然后在每次代码主动commit之前，判断该数据库本身是否设置自动提交，若数据库本身已设置自动提交，则无需手动通过代码commit，不然就会报上面的错；若数据库本身未设置自动提交，则需要通过代码主动commit，方能使本次数据库操作生效。