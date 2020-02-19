# leetcode

[leetcode](https://leetcode-cn.com/problems/two-sum/comments/)

![](C:\Users\longt\AppData\Roaming\Typora\typora-user-images\image-20200218124645708.png)

# First: The sum of two numbers

```tex
给定 nums = [2, 7, 11, 15], target = 9
因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
```

----------------

### on the first try  



```python
def two_sum(arr1,target):
    l = len(arr1) - 1
    flag =1
    for i in range(l):
        for j in range(l-i):
            if arr1[i] + arr1[j+i] == target:
                flag = 0
                print('{0} + {1} = {4} ,the squence is {2} and {3} .'.format(arr1[i],arr1[j+i],i,j+i,target))
            else:
                pass
    if l == -1:
        print('your array is empty')
    elif flag:
        print('not find the outcome')
    else:
        pass

def arrin():
    flag = 1
    arr = []
    while flag :
        amongst = input()
        if amongst.isdigit():
            arr.append(int(amongst))
        else:
            flag = 0
    return arr

#arrreal = [1,2,4,5,7,3,53,73,2,3,4]
arrreal = arrin()
target1 = int(input())
print(arrreal)

two_sum(arrreal,target1)
```

----------------------------------

### already submitted    error : timeout

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        '''
        nums[] is a list need to select;
        target is a int need to add search;
        i dont know whats self;
        a[0] and a[1] is the two goal subscript what we need;
        '''
        a = [0,0]
        for i in range(len(nums)-1):
            for j in range(len(nums)-i-1):
                if nums[i] + nums[i+j+1] == target:
                    a[0] = i
                    a[1] = i+j+1
                    break
                else:
                    pass
        return [a[0],a[1]]
```

--------------------

### hush map others

complexity ：O（n）

```tex
执行用时 :52 ms, 在所有 Python3 提交中击败了90.57%的用户
内存消耗 :14.2 MB, 在所有 Python3 提交中击败了60.99%的用户
```

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        dict = {}
        for i in range(len(nums)):
            tmp = target - nums[i]
            if tmp in dict:
                return [dict[tmp],i]
            dict[nums[i]] = i
```
```tex
执行用时 :48 ms, 在所有 Python3 提交中击败了95.42%的用户
内存消耗 :14.4 MB, 在所有 Python3 提交中击败了51.41%的用户
```

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        dict = {}
        for i,j in enumerate(nums):
            if j in dict:
                return [dict.get(j),i]
            dict[target - j] = i
```

-------------

### others 

```tex
执行用时 :1128 ms, 在所有 Python3 提交中击败了27.01%的用户
内存消耗 :14.1 MB, 在所有 Python3 提交中击败了70.27%的用户
```

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        for i in range(len(nums)):
            if(target-nums[i] in nums and i != nums.index(target-nums[i])):
                    return [i,nums.index(target-nums[i])]
```

improved version

```tex
执行用时 :988 ms, 在所有 Python3 提交中击败了31.47%的用户
内存消耗 :14 MB, 在所有 Python3 提交中击败了73.54%的用户
```

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        for i in range(len(nums)):
            t_d = target-nums[i]
            if t_d not in nums:
                pass
            else:
                j = nums.index(t_d)
                if i == j:
                    pass
                else:
                    return [i,j] 
```

-----------------------------------

```tex
执行用时 :1264 ms, 在所有 Python3 提交中击败了24.13%的用户
内存消耗 :13.9 MB, 在所有 Python3 提交中击败了75.07%的用户
```

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        lens = len(nums)
        j = -520 
        #j is a flags for outcome 
        for i in range (lens):
            if (target - nums[i]) in nums:
                if ( target - nums[i] == nums[i] ) and ( nums.count(nums[i]) == 1 ):
                    continue
                else:
                    j = nums.index(target - nums[i],i+1)
                    break
        if j>0:
            return [i,j]
        else:
            return []

```

## Second: Adding two numbers

```tex
给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。

如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。

您可以假设除了数字 0 之外，这两个数都不会以 0 开头。
```

```tex
输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
输出：7 -> 0 -> 8
原因：342 + 465 = 80
```

------------------------------------------------------------

```tex
执行用时 :56 ms, 在所有 Python3 提交中击败了99.31%的用户
内存消耗 :12.9 MB, 在所有 Python3 提交中击败了44.64%的用户
```

```python
# Definition for singly-linked list.
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

class Solution:
    def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:
        prenode = ListNode(0)
        lastnode = prenode
        val = 0
        while val or l1 or l2:
            val, cur = divmod(val + (l1.val if l1 else 0) + (l2.val if l2 else 0), 10)
            lastnode.next = ListNode(cur)
            lastnode = lastnode.next
            l1 = l1.next if l1 else None
            l2 = l2.next if l2 else None
        return prenode.next
#可以单独运行的模块

def generateList(l: list) -> ListNode:
    prenode = ListNode(0)
    lastnode = prenode
    for val in l:
        lastnode.next = ListNode(val)
        lastnode = lastnode.next
    return prenode.next

def printList(l: ListNode):
    while l:
        print("%d, " %(l.val), end = '')
        l = l.next
    print('')

if __name__ == "__main__":
    l1 = generateList([1, 5, 8])
    l2 = generateList([9, 1, 2, 9])
    printList(l1)
    printList(l2)
    s = Solution()
    sum = s.addTwoNumbers(l1, l2)
    printList(sum)
```

```tex
执行用时 :116 ms, 在所有 Python3 提交中击败了8.16%的用户
内存消耗 :13 MB, 在所有 Python3 提交中击败了44.56%的用户
```

```python
# Definition for singly-linked list.
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

class Solution:
    def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:
        prenode = ListNode(0)
        lastnode = prenode
        val = 0
        while val or l1 or l2:
            val, cur = divmod(val + (l1.val if l1 else 0) + (l2.val if l2 else 0), 10)
            lastnode.next = ListNode(cur)
            lastnode = lastnode.next
            l1 = l1.next if l1 else None
            l2 = l2.next if l2 else None
        return prenode.next
```

