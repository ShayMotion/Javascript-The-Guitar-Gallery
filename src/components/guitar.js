class Guitar {

  constructor(guitar){
       this.brand = brand;
       this.model = model;
       this.year = year;
       this.price = price;

      createGuitar(e)
      e.preventDefault()
      const guitarInput = e.target.children[0].value
      const guitarList = e.target.nextElementSibling
      const auctionId = e.target.parentElement.dataset.id

      Guitar.submitGuitar(guitarInput, guitarList, auctionId)
  
      e.target.reset()
  }
  
  renderGuitar(guitarList){
      const li = document.createElement('li')
      li.dataset.id = this.auction_id
      li.innerText = this.content
  
      const deleteBtn = document.createElement('button')
      deleteBtn.innerText = "X"
      li.appendChild(deleteBtn)
      commentList.appendChild(li)
  
  }
  
  static submitGuitar(guitar, guitarList, auctionId){
      fetch(guitarURL, {
          method: "POST",
          headers: {
              "Content-type": "application/json", 
              "Accept": "application/json"
          }, 
          body: JSON.stringify({
              content: guitar, 
              auction_id: auctionId
          })
      }).then(res => res.json())
      .then(guitar => {
          let newGuitar = new Guitar(guitar)
          newGuitar.renderGuitar(guitarList)
      })
  }
}