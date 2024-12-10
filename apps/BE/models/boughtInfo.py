class BoughtInformation:
    def __init__(self, itemId, title, quantity, price, image):
        self._itemId = itemId
        self._title = title
        self._quantity = quantity
        self._price = price
        self._image = image

    @property
    def itemId(self):
        return self._itemId

    @itemId.setter
    def itemId(self, value):
        if not isinstance(value, int) or value <= 0:
            raise ValueError("Item ID must be a positive integer")
        self._itemId = value

    @property
    def title(self):
        return self._title

    @title.setter
    def title(self, value):
        if not isinstance(value, str) or len(value) == 0:
            raise ValueError("Title must be a non-empty string")
        self._title = value

    @property
    def quantity(self):
        return self._quantity

    @quantity.setter
    def quantity(self, value):
        if not isinstance(value, int) or value < 0:
            raise ValueError("Quantity must be a non-negative integer")
        self._quantity = value

    # Getter and Setter for price
    @property
    def price(self):
        return self._price

    @price.setter
    def price(self, value):
        if not isinstance(value, (int, float)) or value < 0:
            raise ValueError("Price must be a non-negative number")
        self._price = value

    # Getter and Setter for image
    @property
    def image(self):
        return self._image

    @image.setter
    def image(self, value):
        if not isinstance(value, str) or not value.startswith("http"):
            raise ValueError("Image must be a valid URL string")
        self._image = value
