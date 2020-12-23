
class Auction {

  static allAuctions = []

  constructor(auction){
      this.id = auction.id
      this.title = auction.title
      this.startDate = auction.startDate
      this.endDate = auction.endDate
      Auction.allAuctions.push(this)
    }

    static renderAuctions(){
      for(let auction of this.allAuctions){
        auction.renderAuction()
    }
  }

  static fetchAuctions(){
    fetch(auctionURL)
    .then(res => res.json())
    .then(auctions => {
     for(let auction of auctions){
       let newList = new Auction(auction.data)
     }
     this.renderPosts()
  })
}

renderAuction(){
  const li = document.createElement('li')
  li.dataset.id = this.id

  const p = document.createElement('p')
  p.innerText = this.content

  const deleteBtn = document.createElement("button")
  deleteBtn.innerText = "delete"
  deleteBtn.addEventListener("click", this.deletePost)

  const guitarForm = document.createElement('form')
  guitarForm.innerHTML += `<input type="text" id="guitar-input"><input type="submit">`
  guitarForm.addEventListener("submit", Guitar.createGuitar)

  const guitarList = document.createElement('ul')
  this.guitars.forEach(guitar => {
      let guitarObj = new Guitar(guitar)
      console.log(guitarObj)
      guitarObj.renderGuitar(guitarList)
  })

  li.append(p, deleteBtn, guitarForm, guitarList)

 auctionList.appendChild(li)
  
  auctionForm.reset()
}

static submitAuction(){
  event.preventDefault()
  const configObj = {
      method: "POST", 
      headers: {
          "Content-type": "application/json", 
          "Accept": "application/json"
      }, 
      body: JSON.stringify({
          content: auctionInput.value
      })
  }

  fetch(auctionURL, configObj)
  .then(res => res.json())
  .then(data => {
      let newAuction = new Auction(data.data)
      newAuction.renderAuction()
  })

}

deleteAuction(){
  const auctionId = this.parentElement.dataset.id

  fetch(`${auctionURL}/${auctionId}`, {
      method: "DELETE"
  })

  this.parentElement.remove()
}


}