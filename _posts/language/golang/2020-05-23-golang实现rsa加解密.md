---
layout: post
tags: go
---



## 概述

1. 数字签名
2. 加解密
3. 对称
4. 非对称



1. RSA算法

大整数的因数分解，是一件非常困难的事情（对目前的计算机算力和数学方法来说）。我们可以以此为数据加解密

```golang
package main

import (
	"errors"
	"fmt"
	"reflect"
	"strconv"
	"strings"
)

func main() {
	//publicKey, privateKey := generateKey(999773, 999959)
	publicKey, privateKey := generateKey(7001, 7079)
	txt := "password"
	fmt.Println("publicKey",publicKey)
	fmt.Println("privateKey", privateKey)
	encode := rsaEnCode(publicKey, txt)
	fmt.Println(encode)
	decode := rsaDeCode(privateKey, encode)
	fmt.Println(decode)
}

//gcd 最大公约数greatest common divisor,辗转相除法
func gcd(x, y uint64) uint64 {
	tmp := x % y
	if tmp > 0 {
		return gcd(y, tmp)
	}
	return y

}

//lcm 最小公倍数least common multiple，公式法
func lcm(x, y uint64) uint64 {
	return x * y / gcd(x, y)
}

//generateKey 生成密钥
func generateKey(a, b uint64) ([2]uint64, [2]uint64) {
	publicKey := [2]uint64{}
	privateKey := [2]uint64{}
	n := a * b
	publicKey[0] = n
	privateKey[0] = n

	l := lcm(a-1, b-1)
	e, err := getE(l)
	if err != nil {
		fmt.Println(err)
	}
	d, err := getD(e, l)
	if err != nil {
		fmt.Println(err)
	}
	publicKey[1] = e
	privateKey[1] = d
	fmt.Println(e)
	fmt.Println(d)
	return publicKey, privateKey
}

// 获取公钥参数e
func getE(l uint64) (uint64, error) {
	e := l - 1
	for {
		if e <= 1 {
			return 0, errors.New("no e founded")
		}
		if gcd(e, l) == 1 {
			return e, nil
		}
		e--
	}
}

//获取私钥参数d
func getD(e, l uint64) (uint64, error) {
	d := l - 1
	for {
		if d <= 1 {
			return 0, errors.New("no d founded")
		}
		if e*d%l == 1 {
			return e, nil
		}
		d--
	}
}

// 无符号64位整形求幂
func pow(a, b uint64) uint64 {
	if b == 0 {
		return 1
	}
	out := a
	for {
		if b == 1 {
			return out
		}
		out *= a
		b--
	}
}

//rsa加密
func rsaEnCode(publicKey [2]uint64, string2 string) string {
	pp := make([]string,0,len(string2))
	for _,v :=range string2 {
		uint64String := uint64(v)
		encodeUint := pow(uint64String, publicKey[1]) % publicKey[0]
		encodeString := strconv.FormatUint(encodeUint, 10)
		pp = append(pp, encodeString)
	}
	fmt.Println("rsaEncode",fmt.Sprintf(strings.Join(pp,",")))
	return fmt.Sprintf(strings.Join(pp,","))
}

//rsa解密
func rsaDeCode(publicKey [2]uint64, string2 string) string {
	txtSlice := strings.Split(string2,",")
	fmt.Println("txt",txtSlice,reflect.TypeOf(txtSlice))
	pp := make([]string,0,len(txtSlice))
	for _,v :=range txtSlice {
		uint64String,_ := strconv.ParseUint(v,10,64)
		encodeUint := pow(uint64String, publicKey[1]) % publicKey[0]
		encodeString := string(encodeUint)
		fmt.Println(encodeUint,encodeString)
		pp = append(pp, encodeString)
	}
	fmt.Println("rsaDecode",pp,fmt.Sprintf(strings.Join(pp,"")))
	return fmt.Sprintf(strings.Join(pp,""))
}
```

