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
}

Node.all = []
Node.id = 0