const controls = document.querySelector("#controls")
const treeDisplay = document.querySelector("#tree")
const newNodeForm = document.querySelector("#new-node-form")
const searchForm = document.querySelector("#search-form")
const matchList = document.querySelector("#matches")
const avlModeButton = document.querySelector("#avl")

searchForm.style.display = "none"
let avlMode = false
let treeType = "basic"
let tree = null
let chosenNode = null

newNodeForm.addEventListener("submit", function(event){
  event.preventDefault()

  if (treeType === "trie"){
    tree.append(event.target.node.value)
  } else {
    if(!chosenNode && treeType !== "bst"){
      alert("please choose a node")
      return
    }
    const val = parseInt(event.target.node.value)
    console.log(val)
    // if (avlMode && tree.avlAppend){
    //   tree.avlAppend(val, chosenNode)
    // } else {
      tree.append(val, chosenNode)
    // }
  }
  

  tree.render()
  if (chosenNode)
   chosenNode.element.querySelector(".cell").className = "cell chosen"

  event.target.reset()
})

searchForm.addEventListener("submit", function(event){
  event.preventDefault()
  if (tree.search){
    const val = treeType === "bst" ? parseInt(event.target.term.value) : event.target.term.value

    const matches = tree.search(val)

    if (matches){
      matchList.innerHTML = ""
      matches.forEach(function(match){
        matchList.insertAdjacentHTML("beforeend", `<li>${match}</li>`)
      }) 
    }
  }
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
  } else if (event.target.dataset.action === "avl"){
    if (avlMode){
      avlMode = false
      event.target.innerText = "ENABLE AVL MODE!"
    } else {
      avlMode = true
      event.target.innerText = "DISABLE AVL MODE!"
    }
  } else if (event.target.dataset.action === "bst"){
    treeType = "bst"
    searchForm.style.display = ""
    avlModeButton.style.display = ""
    reset()
  } else if (event.target.dataset.action === "basic"){
    treeType = "basic"
    searchForm.style.display = "none"
    avlModeButton.style.display = "none"
    reset()
  } else if (event.target.dataset.action === "trie"){
    treeType = "trie"
    searchForm.style.display = ""
    avlModeButton.style.display = "none"
    reset()
  } else if (event.target.dataset.action === "populate"){
    reset()
    if(treeType === "bst"){
      populateBinaryTree()
      tree.render()
    } else if(treeType === "basic"){
      populateTree()
      tree.render()
    } else if(treeType === "trie"){
      populateTrie()
      tree.render()
    }
  }
})

function reset(){
  if(treeType === "bst"){
    tree = new BinarySearchTree(treeDisplay)
  } else if(treeType === "basic"){
    tree = new Tree(treeDisplay)
  } else if (treeType === "trie"){
    tree = new Trie(treeDisplay)
  }

  matchList.innerHTML = ""
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
  tree.append(45)
  tree.append(32)
  tree.append(50)
  tree.append(57)
}

function populateTrie(){
  tree.append("beef")
  tree.append("beer")
  tree.append("bell")
  tree.append("belfry")
  tree.append("robe")
  tree.append("rout")
  tree.append("robed")
  tree.append("rotor")
}