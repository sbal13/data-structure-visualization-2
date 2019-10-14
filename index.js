const controls = document.querySelector("#controls")
const treeDisplay = document.querySelector("#tree")
const newNodeForm = document.querySelector("#new-node-form")
let treeType = "basic"
let tree = new Tree(treeDisplay)
// let tree = new BinarySearchTree(treeDisplay)
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
  } else if (event.target.dataset.action === "bst"){
    treeType = "bst"
    reset()
  } else if (event.target.dataset.action === "basic"){
    treeType = "basic"
    reset()
  } else if (event.target.dataset.action === "populate"){
    reset()
    if(treeType === "bst"){
      populateBinaryTree()
      tree.render()
    } else if(treeType === "basic"){
      populateTree()
      tree.render()
    }
  }
})

function reset(){
  if(treeType === "bst"){
    tree = new BinarySearchTree(treeDisplay)
  } else if(treeType === "basic"){
    tree = new Tree(treeDisplay)
  }
  treeDisplay.innerHTML = ""
  chosenNode = null
  Node.all = []
}




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

function populateBinaryTree(){
  tree.append(26)
  tree.append(15)
  tree.append(23)
  tree.append(11)
  tree.append(29)
  tree.append(27)
  tree.append(28)
}

populateTree()
tree.render()