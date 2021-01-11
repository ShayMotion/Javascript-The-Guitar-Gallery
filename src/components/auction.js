const auctionForm = document.getElementById("auction-form");
const auctionTitleInput = document.getElementById("auction-title");
const auctionStartDateInput = document.getElementById("auction-start-date");
const auctionEndDateInput = document.getElementById("auction-end-date");
const auctionList = document.getElementById("auction-list");

class Auction {

  static auctions = []

  constructor(attributes) {
    this.id = attributes.id
    this.title = attributes.title
    this.startDate = attributes.startDate
    this.endDate = attributes.endDate;
    this.guitars = [];
    for (const guitarJSON of attributes.guitars) {
      this.guitars.push(new Guitar(guitarJSON));
    }
  }

  static renderAuctions() {
    auctionList.innerHTML = ""; // clear auction list
    for (const auction of this.auctions) {
      auction.render();
    }
  }
  /**
   * Fills in the Auction select element in the guitar form with the auctions
   * fetched from the backend.
   */
  static renderAuctionOptions() {
    guitarAuctionSelect.innerHTML = ""; // clear guitar for auction select
    for (const auction of this.auctions) {
      let option = document.createElement("option");
      option.value = auction.id;
      option.innerText = auction.title;
      guitarAuctionSelect.add(option);
    }
  }

  static fetchAuctions() {
    fetch(AUCTIONS_API_URL)
      .then(res => res.json())
      .then(auctionsJSON => {
        this.auctions = []; // reset auctions list on every fetch
        for (const auction of auctionsJSON.data) {
          this.auctions.push(new Auction(auction.attributes))
        }
        this.renderAuctions();
        this.renderAuctionOptions();
      }).catch(function (err) {
        throw err;
      });
  }

  static createAuction(event) {
    event.preventDefault();

    const params = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        title: auctionTitleInput.value,
        start_date: auctionStartDateInput.value,
        end_date: auctionEndDateInput.value
      })
    }

    fetch(AUCTIONS_API_URL, params)
      .then(res => res.json())
      .then(json => {
        const auction = new Auction(json.data.attributes)
        Auction.auctions.push(auction);
        auction.render();
      });
  }

  /**
   * Instance method to render an Auction into the html.
   */
  render() {
    const li = document.createElement('li');
    li.dataset.id = this.id;

    // Create auction title
    const span = document.createElement('span')
    span.innerText = this.title + " "

    // Create delete button
    const deleteBtn = document.createElement("button")
    deleteBtn.innerText = "delete"
    deleteBtn.addEventListener("click", this.destroy.bind(this));

    // Create guitar list
    const guitarUl = document.createElement("ul");
    for (const guitar of this.guitars) {
      guitarUl.appendChild(guitar.render());
    }

    // Fill in li and append to auction list in html
    li.append(span, deleteBtn, guitarUl)
    auctionList.appendChild(li)

    // clear form after done creating new auction
    auctionForm.reset();
  }

  /**
   * Instance method to delete an auction from the backend. After successful
   * deletion, the auction is removed from the html. This function is called
   * when an auction's 'delete' button is clicked.
   * @param {event} event 
   */
  destroy(event) {
    fetch(`${AUCTIONS_API_URL}/${this.id}`, {
        method: "DELETE"
      })
      .then(resp => {
        if (resp.ok) {
          event.target.parentElement.remove();
        } else {
          console.log(resp);
        }
      })
      .catch(error => {
        throw error;
      })
  }
}