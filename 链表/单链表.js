class Node {
  value = null
  next = null
  prev = null
}

// 单双链表反转   删除链表中指定的值（需要返回头节点，因为可能把原头节点删除掉）,   不使用额外容器
// 数组实现队列和栈    双链表实现队列和栈    玩头尾节点  Head Tail
// 数组实现队列   begin  end  size   加数据 size没满   放到end指向位置，end++    取数据  size没空，指向begin位置的数字，begin--
// 双端队列
// 只用栈结构实现队列结构      图的深度优先遍历 用栈结构 ----->先把栈结构用队列结构转化，再进行正常的深度优先遍历
// 只用队列结构实现栈结构      图的广度优先遍历 用队列结构 --->先把队列结构用栈结构转化，再进行正常的广度优先遍历

class LinkList {
  head = {
    value: 1,
    next: this.next111
  }
  next111 = {
    value: 2,
    next: null
  }
}

let newLinkList = new LinkList()
console.log(newLinkList.head)