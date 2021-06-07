// 整个最优解算法主要流程就是将数组上每个数字转为用32位二进制数字的数组的数据结构表达，利用或运算的特性找到有效的不同位置的1，然后把这些1用位运算或到创建的白板变量0中，这样就找到对应的数字a了，然后再匹配出现的次数是不是指定的k次。

// 其中0这种情况需要特殊处理，因为0不管进行多少次或运算都得不到有效的1，所以或运算不能统计十进制数的0出现的次数，在遍历的时候需要提前将数字0出现的次数缓存起来。
// 经典高难题，K，M异或，囊括异或的高级用法
// 给定一个由多个数字组成的数组arr，数字a出现了k次，其他数字都出现了m次,找到这出现k数次的a数字,如果给定的数字a出现的次数不满足k次，返回-1. 其中m>1, k<m，  要求时间复杂度O(N)  空间复杂度O(1)
class xorKM {
  map = new Map()
  // 暴力法，遍历数组中所有的数字，把它的所有该节点对应的次数记录到map中，返回对应的k次的数字  
  test(arr, k, m) {
    let map = new Map()
    for (let i = 0; i < arr.length; i++) {
      if (map.has(arr[i])) {
        map.set(arr[i], map.get(arr[i]) + 1)
      } else {
        map.set(arr[i])
      }
    }
    for (let num of map.keys()) {
      if (map.get(num) === k) {
        return num
      }
    }
    return -1
  }

  onlyKTimes(arr, k, m) {
    if (this.map.size === 0) {
      this.mapCreater(this.map)
    } else {
      this.map.clear()
    }
    let tempArr = []
    let countZero = 0
    // tempArr[0] 0位置的1出现了几个
    // tempArr[i] i位置的1出现了几个
    for (let i = 0; i < arr.length; i++) {
      // 将arr对应的第i位数字转成32位的map结果存储，并将有1的i存入tempArr的对应位置上
      // 提前缓存0的情况出现次数
      if (arr[i] === 0) countZero++
      while (arr[i] !== 0) {
        // 获取一个数字num的二进制最右侧的1, x = num & ((~num) + 1)   =>  x = num & (-num)
        // 只移动有效的不同位置的二进制位数字1
        let rightOne = arr[i] & (-arr[i])
        tempArr[this.map.get(rightOne)]++
        arr[i] ^= rightOne
      }
    }
    // 初始化一个所有位置都为0的答案，在对应的位置上有1的地方把1或进去
    let ans = 0
    for (let i = 0; i < 32; i++) {
      if (tempArr[i] % m !== 0) {
        if (tempArr[i] % m == k) {
          // 第i位上应该有1，把1右移动i位或进去
          ans |= (1 << i)
        } else {
          return -1
        }
      }
    }

    // 0出现不足k次情况特殊处理
    if (ans === 0 && countZero !== k) {
      return -1
    }

    return ans
  }

  // 将传递进来的map每一位数字对应的二进制位
  mapCreater(map) {
    // 将map上的每个位置上的数字都映射到对应的i，建立二进制位上各个位置的映射表
    let value = 1
    for (let i = 0; i < 32; i++) {
      // 放入二进制对应index的位置
      map.set(value, i)
      // 放完之后value左移一位
      value <<= 1
    }
  }

  // 生成测试用例的随机数组
  randomArrays(maxKinds, range, k, m) {
    // 对应应该生成k次数的数字
    const kTimesNum = this.randomNumber(range)
    // 指定k次数的该数字实际生成的次数  有可能不满k次，满k次返回该数字，不满k次返回-1
    const times = Math.random() < 0.5 ? k : Math.floor(Math.random() * (m - 1)) + 1
    // 因为指定k次数的数字一定存在，所以后续出现的数组种类取值范围是 [1, maxKinds]
    let numKinds = Math.floor(Math.random() * maxKinds) + 1
    let arr = [] // length = times + m * (kinds -  1)
    for (let i = 0; i < times; i++) {
      arr[i] = kTimesNum
    }
    let set = new Set()
    set.add(kTimesNum)
    while (numKinds != 0) {
      let curNum = 0
      do {
        curNum = this.randomNumber(range)
      } while (set.has(curNum));
      // 获取到不重复的curNum,把不重复的curNum缓存到set中，num种类-1
      set.add(curNum)
      numKinds--
      // 处理获取到的不重复种类数字curNum，重复塞入arr中m次
      for (let j = 0; j < m; j++) {
        arr[j] = curNum
      }
    }
    // arr随机内容填充完毕，开始乱序
    for (let i = 0; i < arr.length; i++) {
      // [0, N-1]
      const j = Math.floor(Math.random() * arr.length)
      if (i !== j) this.xorSwap(arr[i], arr[j])
    }
    // 将乱序完毕的数组返回
    return arr
  }

  // 利用异或交换变量（不使用额外空间），前提两数占据不同的内存空间。  利用1 异或特性
  // 异或特性1:   0 ^ N  =>  N    说明0不影响异或结果
  // 异或特性2:   N ^ N  =>  0    说明同位置index异或后该位的偶数次相同数字不影响异或结果
  // 异或特性3:   满足交换律和结合律  (a ^ b) ^ c  === a ^ (b ^ c)
  xorSwap(prev, next) {
    // a = x    b = y
    prev = prev ^ next // a = x ^ y
    next = prev ^ next // b = x ^ y ^ y => x ^ (y ^ y) => x ^ 0 => x
    prev = prev ^ next // a = x ^ y ^ x => (x ^ x) ^ y => 0 ^ y => y
    // 等同于下述代码
    // const tmp = prev
    // prev = next
    // next = tmp
  }

  // 随机生成[min, max]的均匀分布的整数
  randomIntMinMax(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
  }

  // 随机生成范围[-range, range]的整数
  randomNumber(range) {
    return (Math.floor(Math.random() * range) + 1) - (Math.floor(Math.random() * range) + 1)
  }

  // 对数器验证算法是否通过， 先写一个随机生成函数， 然后用暴力法产生一个标准数据结果，再用自己的算法产生的结果比对，一致说明通过了，不一致就报错 
  main() {
    const kinds = 5 // 有5种不同的数字
    const range = 30 // 随机数字的取值范围是-30 ～30
    const testTimes = 100000 // 用例次数
    const max = 9 // k,m取值范围最大数为9,    k,m取值范围最小值为1
    console.log('测试用例开始')
    for (let i = 0; i < testTimes; i++) {
      let a = Math.floor(Math.random() * max) + 1 // 1-9
      let b = Math.floor(Math.random() * max) + 1 // 1-9
      let k = Math.min(a, b)
      let m = Math.max(a, b)
      if (k == m) {
        m++
      }
      // 随机数组的生成是关键，非常锻炼coding能力
      let arr = this.randomArrays(kinds, range, k, m)
      const result1 = this.test(arr, k, m)
      const result2 = this.onlyKTimes(arr, k, m)
      if (result1 !== result2) {
        console.log(result1)
        console.log(result2)
        console.log('报错了')
      }
    }
    console.log('测试用例结束')
  }
}

const xorKMInstance = new xorKM()
xorKMInstance.main()