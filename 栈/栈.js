class Stack {
  constructor() {
    this.data = []
    this.count = 0
    this.countMin = 0
    this.minData = []
  }
  push(item) {
    this.data[this.count++] = item
    // 1、没有数据直接入栈 2、item<=minData最小值，直接入栈
    if (this.countMin === 0 || item <= this.min()) {
      this.minData[this.countMin++] = item
    }
    console.log(this.top())
  }
  min() {
    return this.minData[this.countMin - 1]
  }
  pop() {
    // 出栈的前提栈中存在元素
    if (this.isEmpty()) {
      console.log('栈为空')
      return
    }
    // 移除栈顶元素
    if (this.top() === this.min()) {
      delete this.minData[--this.minData]
    }
    delete this.data[--this.count]
  }
  top() {
    if (this.isEmpty()) {
      console.log('栈为空')
      return
    }
    return this.data[this.count - 1]
  }
  size() {
    return this.count
  }
  clear() {
    this.data = []
    this.count = 0
  }
  isEmpty() {
    return this.count === 0
  }
}

let s = new Stack()
s.push(4)
s.push(5)
s.push(2)
console.log(s.min())