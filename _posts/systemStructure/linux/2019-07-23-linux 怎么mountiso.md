---
layout: post
tags: linux
---



1.  Create the mount point directory on Linux: **sudo mkdir /mnt/iso**
2.  Mount the ISO file on Linux: **sudo mount -o loop /path/to/my-iso-image.iso /mnt/iso**
3.  Verify it, run: **mount** OR **df -H** OR **ls -l /mnt/iso/**
4.  Unmount the ISO file using: **sudo umount /mnt/iso/**

