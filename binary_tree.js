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
      if (node.left) {
        this.appendUtil(node.left, newNode)
      } else {
        node.left = newNode
        newNode.parent = node
      }
    } else if (node.value < newNode.value){
      if (node.right) {
        this.appendUtil(node.right, newNode)
      } else {
        node.right = newNode
        newNode.parent = node
      }
    } else {
      alert("already in tree!")
    }
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