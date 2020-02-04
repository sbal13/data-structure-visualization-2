class Node{
  constructor(value, parent, type){
    this.value = value
    this.parent = parent
    this.element = null
    this.id = ++Node.id

    switch(type){
      case "bts":
        this.left = null
        this.right = null
        break;
      case "basic":
        this.children = []
        break;
      case "trie":
        this.children = {}
        break;
    }

    Node.all.push(this)
  }

  height = () => {
    return Math.max(this.leftSubtreeHeight(), this.rightSubtreeHeight());
  }

  leftSubtreeHeight = () => {
    return this.left && this.left.value !== null ? this.left.height() + 1 : 0;
  }

  rightSubtreeHeight = () => {
    return this.right && this.right.value !== null ? this.right.height() + 1 : 0;
  }

  balanceFactor = () => {
    return this.leftSubtreeHeight() - this.rightSubtreeHeight();
  }

  get isParentRightChild(){
    return this.parent && (this.parent.right === this)
  }

}

Node.all = []
Node.id = 0