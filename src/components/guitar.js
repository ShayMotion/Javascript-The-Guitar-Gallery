const guitarForm = document.getElementById("guitar-form");
const guitarBrandInput = document.getElementById("guitar-brand");
const guitarModelInput = document.getElementById("guitar-model");
const guitarYearInput = document.getElementById("guitar-year");
const guitarPriceInput = document.getElementById("guitar-price");
const guitarAuctionSelect = document.getElementById("guitar-auction");

class Guitar {

    constructor(attributes) {
        this.id = attributes.id;
        this.brand = attributes.brand;
        this.model = attributes.model;
        this.year = attributes.year;
        this.price = attributes.price;
    }

    static createGuitar(event) {
        event.preventDefault();

        fetch(GUITARS_API_URL, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    brand: guitarBrandInput.value,
                    model: guitarModelInput.value,
                    year: guitarYearInput.value,
                    price: guitarPriceInput.value,
                    auction_id: guitarAuctionSelect.value
                })
            })
            .then(res => res.json())
            .then(json => {
                let guitar = new Guitar(json.data.attributes);
                Auction.fetchAuctions();
                guitarForm.reset();
            });
    }

    render() {
        const li = document.createElement("li");
        li.innerText = `${this.year} ${this.brand} ${this.model} - $${this.price} - `;

        const deleteButton = document.createElement('button');
        deleteButton.innerText = "x";
        deleteButton.addEventListener("click", this.destroy.bind(this));
        li.appendChild(deleteButton)
        return li;
    }

    destroy(event) {
        fetch(`${GUITARS_API_URL}/${this.id}`, {
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