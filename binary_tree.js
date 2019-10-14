class BinarySearchTree extends Tree {

  append = (value) => {
    const newNode = new Node(value, null, true)

    if (this.root){
      this.appendUtil(this.root, newNode)
    } else {
      this.root = newNode
    }
  }

  // 23,15,78
  appendUtil = (node, newNode) =>{

    if (node.value > newNode.value){
      if (node.left && node.left.value) {
        this.appendUtil(node.left, newNode)
      } else {
        node.left = newNode
        newNode.parent = node

        if (!node.right){
          node.right = new Node(null, node, true)
        }
      }
    } else if (node.value < newNode.value){
      if (node.right && node.right.value) {
        this.appendUtil(node.right, newNode)
      } else {
        node.right = newNode
        newNode.parent = node

        if (!node.left){
          node.left = new Node(null, node, true)
        }
      }
    } else {
      alert("already in tree!")
    }
  }

  dfsUtil = (node, callback) => {
    callback(node)
    if (node.left)
      this.dfsUtil(node.left, callback)
    if (node.right)
      this.dfsUtil(node.right, callback)
  }

  bfs = (callback) => {
    let list = []
    let node = this.root

    while (node){
      if (node.left)
        list.push(node.left)
      if (node.right)
        list.push(node.right)
      
      callback(node)
      node = list.shift()
    }
  }

}