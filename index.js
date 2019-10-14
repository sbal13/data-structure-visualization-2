const controls = document.querySelector("#controls")
const treeDisplay = document.querySelector("#tree")
const newNodeForm = document.querySelector("#new-node-form")
// let tree = new Tree(treeDisplay)
let tree = new BinarySearchTree(treeDisplay)
let chosenNode = null

newNodeForm.addEventListener("submit", function(event){
  event.preventDefault()

  const val = parseInt(event.target.node.value)
  tree.append(val || event.target.node.value, chosenNode)

  tree.render()
  if (chosenNode)
   chosenNode.element.querySelector(".cell").className = "cell chosen"
})

treeDisplay.addEventListener('click', function(event){
  if (event.target.className === "cell"){
    if (chosenNode){
      chosenNode.element.querySelector(".cell").className = "cell"
    }
    chosenNode = Node.all.find(node => node.id === parseInt(event.target.dataset.id))

    chosenNode.element.querySelector(".cell").className = "cell chosen"
  }
})

controls.addEventListener("click", function(event){
  if (event.target.dataset.action === "dfs"){
    tree.displayTraversal("dfs")
  } else if (event.target.dataset.action === "bfs"){
    tree.displayTraversal("bfs")
  }
})




function populateTree(){
  tree.append(1)

  tree.append(2, tree.root)
  tree.append(3, tree.root)
  tree.append(4, tree.root)

  tree.append(5, tree.root.children[0])

  tree.append(6, tree.root.children[1])
  tree.append(7, tree.root.children[1])
  tree.append(8, tree.root.children[1])

  tree.append(9, tree.root.children[2])
  tree.append(10, tree.root.children[2])
}

// populateTree()
tree.render()