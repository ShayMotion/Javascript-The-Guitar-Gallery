const auctionForm = document.getElementById("auction-form")
const auctionInput = document.getElementById("auction-input")
const auctionList = document.getElementById("auction-list")
const auctionURL = `http://localhost:3000/auctions`
const guitarURL = `http://localhost:3000/guitars`

auctionForm.addEventListener("submit", Auction.submitAuction)

Auction.fetchAuctions()