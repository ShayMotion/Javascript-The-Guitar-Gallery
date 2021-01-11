const API_HOST = "http://localhost:3000";
const AUCTIONS_API_URL = `${API_HOST}/auctions`;
const GUITARS_API_URL = `${API_HOST}/guitars`;

document.addEventListener('DOMContentLoaded', () => {
    auctionForm.addEventListener("submit", Auction.createAuction);
    guitarForm.addEventListener("submit", Guitar.createGuitar);
    Auction.fetchAuctions();
});