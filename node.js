class Node{
  constructor(value, parent, binary = false){
    this.value = value
    this.parent = parent
    this.element = null
    this.id = ++Node.id

    if (binary){
      this.left = null
      this.right = null
    } else {
      this.children = []
    }

    Node.all.push(this)
  }
}

Node.all = []
Node.id = 0