class Products: 
    def __init__(self, id, name, price, category_id, description, inStock, image):
        self._id = id
        self.name = name
        self.price = price
        self.category_id = category_id
        self.description = description
        self.inStock = inStock
        self.image = image
    @property
    def id(self):
        return self._id

    @property
    def name(self):
        return self._name

    @name.setter
    def name(self, value):
        self._name = value

    @property
    def price(self):
        return self._price

    @price.setter
    def price(self, value):
        if value < 0:
            raise ValueError("Price cannot be negative")
        self._price = value

    @property
    def category_id(self):
        return self._category_id

    @category_id.setter
    def category_id(self, value):
        self._category_id = value

    @property
    def description(self):
        return self._description

    @description.setter
    def description(self, value):
        self._description = value

    # Getter and Setter for inStock
    @property
    def inStock(self):
        return self._inStock

    @inStock.setter
    def inStock(self, value):
        if not isinstance(value, bool):
            raise ValueError("inStock must be a boolean")
        self._inStock = value

    @property
    def image(self):
        return self._image

    @description.setter
    def description(self, value):
        self._image = value
