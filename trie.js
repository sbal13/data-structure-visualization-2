class Trie extends Tree{
  constructor(container){
    super()
    this.root = new Node("", null, "trie")
    this.container = container
  }

  search(term){
    const chars = term.split("")
    setTimeout(() => { this.render()}, 2000)
    return this.searchUtil(this.root, term, chars)
  }

  searchUtil(node, term, chars){

    if (node.value){
      const cell = node.element.querySelector(".cell")
      cell.style.backgroundColor = "blue"
      cell.style.color = "white"
      cell.style.borderColor = "black"
    }


    const char = chars.shift()
    if (!char){
      const matches = []
      this.matchUtil(node, term, matches)
      return matches
    }

    if(node.children[char]){
      return this.searchUtil(node.children[char], term, chars)
    } else {
      alert("no match")
      return []
    }
  }

  matchUtil(node,word,matches){
    if(Object.keys(node.children).length){
      for(let letter in node.children){
        const newWord = word + letter
        node.children[letter].element.querySelector(".cell").style.backgroundColor = "green"
        this.matchUtil(node.children[letter], newWord, matches)
      } 
    } else {
      matches.push(word)
    }

  }



  

  append(string){
    const chars = string.split("")
    let node = this.root
    // console.log(chars)

    while(chars.length){
      const char = chars.shift()
      if(node.children[char]){
        node = node.children[char]
      } else {
        const newNode = new Node(char, node, "trie")
        node.children[char] = newNode
        node = newNode
      }
    }
  }

  dfsUtil = (node, callback) => {
    const value = callback(node)
    Object.values(node.children).forEach((child) => {
      this.dfsUtil(child, callback)
    })

    return value
  }

  bfs = (callback) => {
    let list = []
    let node = this.root

    while (node){
      list = [...list, ...Object.values(node.children)]
      callback(node)
      node = list.shift()
    }
  }
}