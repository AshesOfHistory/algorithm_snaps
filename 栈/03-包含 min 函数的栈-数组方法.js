class MinStack {
  constructor () {
    this.stack = []
    this.minStack = []
    this.minNum = null
  }
  // 入栈
  push (item) {
    this.stack.push(item)
    if (!this.minNum) {
      this.minNum = item
    }
    if (item < this.minNum) {
      this.minNum = item
      this.minStack.push(item)
    } else {
      this.minStack.push(this.minNum)
    }
  }
  // 查看栈顶值
  top () {
    return this.stack[this.stack.length - 1]
  }
  // 实现最小值功能
  min () {
    // return Math.min.apply(null, this.stack)
    return this.minStack[this.minStack.length - 1]
  }
  // 出栈方法
  pop () {
    this.minStack.pop()
    return this.stack.pop()
  }
}

const m = new MinStack()

m.push(5)
m.push(2)
m.push(4)
m.push(1)
m.push(3)
console.log(m.min())
m.pop()
console.log(m.min())
m.pop()
console.log(m.min())
console.log(m.top())
