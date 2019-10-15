class Tree {
  constructor(container){
    this.root = null
    this.container = container
  }

  append(value, targetNode){
    const newNode = new Node(value, targetNode, "basic")

    if(this.root){
      targetNode.children.push(newNode)
    } else {
      this.root = newNode
    }
  }

  render(){
    this.container.innerHTML = ""

    this.bfs(this.renderNode.bind(this))
    this.bfs((node) => {
      if (node.parent && node.value !== null){
        this.renderEdge(node.parent.element.querySelector(".cell"), node.element.querySelector(".cell"))
      }
    })
  }

  renderNode(node){
    let nodeEl = document.createElement("div")
    nodeEl.className = "node"

    if(node.value === null){
      node.parent.element.querySelector(".node-children").append(nodeEl)
      return
    }

    let cell = document.createElement("div")
    cell.className = "cell"
    cell.innerText = node.value
    cell.dataset.id = node.id

    let children = document.createElement("div")
    children.className = "node-children"

    nodeEl.append(cell)
    nodeEl.append(children)

    node.element = nodeEl

    if (node.parent){
      node.parent.element.querySelector(".node-children").append(nodeEl)
    } else {
      this.container.append(nodeEl)
    }


    

  }

  renderEdge(parent, child){

    const parentY = parent.offsetTop + parent.offsetHeight
    const parentX = parent.offsetLeft + parent.offsetWidth/2

    const childY = child.offsetTop
    const childX = child.offsetLeft + child.offsetWidth/2

    
    if (childX - parentX < -1){
      this.container.insertAdjacentHTML("beforeend", `
        <svg height=${childY-parentY} width="${parentX-childX}" class="edge" style="top:${parentY};left:${childX}">
          <line x1="${parentX-childX}" y1="0" x2="0" y2="${childY-parentY}" style="stroke:rgb(255,0,0);stroke-width:2" />
        </svg>
      `)
    } else if (childX - parentX > 1){
      this.container.insertAdjacentHTML("beforeend", `
        <svg height=${childY-parentY} width="${childX-parentX}" class="edge" style="top:${parentY};left:${parentX}">
          <line x1="0" y1="0" x2="${childX-parentX}" y2="${childY-parentY}" style="stroke:rgb(255,0,0);stroke-width:2" />
        </svg>
      `)
    } else {
      this.container.insertAdjacentHTML("beforeend", `
        <svg height=${childY-parentY} width="3" class="edge" style="top:${parentY};left:${parentX}">
          <line x1="0" y1="0" x2="${childX-parentX}" y2="${childY-parentY}" style="stroke:rgb(255,0,0);stroke-width:2" />
        </svg>
      `)
    }

    
    
  }

  determineNodeDepth(node){
    let depth = 0;
    let parent = node.parent

    while(parent){
      parent = parent.parent
      depth ++
    }

    return depth
  }

  displayTraversal = (type) => {
    let count = 0;
    let traverseType

    if (type === "bfs"){
      traverseType = this.bfs
    } else  if (type === "dfs"){
      traverseType = this.dfs
    }

    traverseType((node) => {
      if (!node.value)
        return

      setTimeout(function(){
        const cell = node.element.querySelector(".cell")
        cell.className = "cell highlight"
      }, 500*count)

      count++
    })

    setTimeout(this.render.bind(this), 500*count)
  }

  dfs = (callback) => {
    this.dfsUtil(this.root, callback)
  }

  dfsUtil = (node, callback) => {
    callback(node)
    node.children.forEach((child) => {
      this.dfsUtil(child, callback)
    })
  }

  bfs = (callback) => {
    let list = []
    let node = this.root

    while (node){
      list = [...list, ...node.children]
      callback(node)
      node = list.shift()
    }
  }
}