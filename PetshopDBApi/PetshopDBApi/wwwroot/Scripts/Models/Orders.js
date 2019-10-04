class Orders extends Entity {
    constructor(json)
    {
        super(json);
        if (json) {
            this.Date = json.date;
            this.ClientId = json.clientId;
            this.ProductId = json.productId;
        }
        else
        {
            this.Date = 0;
            this.ClientId = 0;
            this.ProductId = 0;
        }
    }
}