class BinarySearchTree extends Tree {

  append = (value) => {
    const newNode = new Node(value, null, "bts")

    if (this.root){
      this.appendUtil(this.root, newNode)
    } else {
      this.root = newNode
    }

    return newNode
  }

  // avlAppend = (value) => {
  //   let node = this.append(value)

  //   while (node) {
  //     this.balance(node);
  //     node = node.parent;
  //   }
  // }

  // removeEmpty(){
  //   this.bfs((node) => {
  //     if (node.value === null){
  //       if (node.parent.left === node)
  //         node.parent.left = null

  //       if (node.parent.right === node)
  //         node.parent.right = null
  //     }
  //   })
  // }

  // balance(node) {
  //   console.log("BALANCING")
  //   if (node.balanceFactor() > 1) {
  //     // left subtree is higher than right subtree
  //     if (node.left.balanceFactor() > 0) {
  //       this.rightRotation(node);
  //     } else if (node.left.balanceFactor() < 0) {
  //       this.leftRightRotation(node);
  //     }
  //   } else if (node.balanceFactor() < -1) {
  //     // right subtree is higher than left subtree
  //     if (node.right.balanceFactor() < 0) {
  //       this.leftRotation(node);
  //     } else if (node.right.balanceFactor() > 0) {
  //       this.rightLeftRotation(node);
  //     }
  //   }
  // }

  // swapParentChild(oldChild, newChild, parent) {
  //   if (parent) {
  //     const side = oldChild.isParentRightChild ? 'right' : 'left';
  //     // this set parent child AND also
  //     parent[side] = newChild;
  //   } else {
  //     // no parent? so set it to null
  //     newChild.parent = null;
  //     this.root = newChild
  //   }
  //   oldChild.parent = newChild
  // }

  // leftRotation(node) {
  //   const newParent = node.right; // e.g. 3
  //   const grandparent = node.parent; // e.g. 1

  //   // make 1 the parent of 3 (previously was the parent of 2)
  //   this.swapParentChild(node, newParent, grandparent);

  //   // do LL rotation
  //   newParent.left = node; // makes 2 the left child of 3
  //   node.right = null; // clean 2's right child

  //   return newParent; // 3 is the new parent (previously was 2)
  // }

  // rightRotation(node) {
  //   const newParent = node.left;
  //   const grandparent = node.parent;

  //   this.swapParentChild(node, newParent, grandparent);

  //   // do RR rotation
  //   newParent.right = node;
  //   node.left = null;

  //   return newParent;
  // }

  // leftRightRotation(node) {
  //   this.leftRotation(node.left);
  //   return this.rightRotation(node);
  // }

  // rightLeftRotation(node) {
  //   this.rightRotation(node.right);
  //   return this.leftRotation(node);
  // }




  search(target){
    this.searchUtil(this.root, target)
  }

  searchUtil(node, target){
    if (!node){
      alert("NOT FOUND :(")
      return
    }
    const cell = node.element.querySelector(".cell")
    cell.style.backgroundColor = "red"
    setTimeout(() =>{
      cell.style.backgroundColor = "white"
      if(node.value === target){
        cell.style.backgroundColor = "green"
        setTimeout(function(){
          cell.style.backgroundColor = "white"
        }, 2000)
      } else if(node.value > target){
        return this.searchUtil(node.left, target)
      } else {
        return this.searchUtil(node.right, target)
      }
    }, 1000)
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
          node.right = new Node(null, node, "bts")
        }
      }
    } else if (node.value < newNode.value){
      if (node.right && node.right.value) {
        this.appendUtil(node.right, newNode)
      } else {
        node.right = newNode
        newNode.parent = node

        if (!node.left){
          node.left = new Node(null, node, "bts")
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