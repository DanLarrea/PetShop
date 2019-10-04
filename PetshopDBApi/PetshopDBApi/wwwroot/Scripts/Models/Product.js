class Product extends Entity {
    constructor(json)
    {
        super(json);
        if (json) {
            this.Category = json.category;
            this.Title = json.title;
            this.Brand = json.brand;
            this.Price = json.price;
            this.Quantity = json.quantity;
        }
        else
        {
            this.Category = "";
            this.Title = "";
            this.Brand = "";
            this.Price = 0;
            this.Quantity = 0;
        }
    }
}