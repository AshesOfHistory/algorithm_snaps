class Node {
  value = null;
  left = null;
  right = null;
  parent = null;
}
let head = new Node()
class Tree {
  head = null;
  size = 0;
  height = 0;
  isBanlanceTree = true;
  isSearchTree = true;
  ifFullTree = true;
}

// 二叉树的递归调用序，每个节点都会访问三次，打印的其访问的先后顺序就是先中后顺序遍历

// 二叉树按层遍历,每层结束添加状态判断该层是否结束。   

// 给定二叉树中某节点，返回该节点所在层数。



// 是否判断一颗树是否平衡二叉树
// info isBalanceTree  height
// X.leftInfo = isBalanceTree
// X.rightInfo = isBalanceTree
// Math.abs(leftInfo.height - rightInfo - height) <= 1

// 判断一颗树是否搜索二叉树 
// X.leftInfo = isSearchTree
// X.rightInfo = isSearchTree
// leftInfo.max < X.value
// rightInfo.min > X.value

// 判断一颗树是否满二叉树
// Tree.length == Math.pow(2, h) - 1

// 给定一颗二叉树，找到树中最大两节点的距离
// info maxDistance
// X是否为头节点 
// 1 X不是头节点 xNotHeadMaxDistanceLeft = maxLeftDistance 左子树最大距离 空节点为0
//             xNotHeadMaxDistanceRight = maxRightDistance 右子树最大距离 空节点为0
// 2 X是头节点 xHeadMaxDistance = maxLeftDistance + maxRightDistance + 1
// max = Math.max(Math.max(xNotHeadMaxDistanceLeft, xNotHeadMaxDistanceRight), xHeadMaxDistance)


// 一颗树不是搜索二叉树，但是拥有多个子搜索二叉树，返回其中最大的一个搜索二叉树的节点数 
// Tree.allSize == maxBSTSubSize   整个树的最大搜索二叉树子树的大小等于该树自身节点数，则该树整个树为搜索二叉树



// 将二叉树序列化为唯一的对应结构字符串，将唯一对应结构的字符串反序列化为二叉树



// 将多叉树序列化为对应的唯一二叉树
// 将多叉树上X节点的子节点都放在A节点的右边界上
// moreTree => twoTree    X.children => X.children && X.children[0] ? X.children[0] : null
//                                                i>0 X.children[i]  X.children[i-1].right = X.children[i]




// 给定二叉树，中序遍历中找到X节点距离其后继节点的距离