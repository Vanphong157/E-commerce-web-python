class CartItem:
    def __init__(self, product_id, quantity, price):
        self.product_id = product_id
        self.quantity = quantity
        self.price = price

    @property
    def product_id(self):
        return self._product_id

    @product_id.setter
    def product_id(self, value):
        self._product_id = value

    @property
    def quantity(self):
        return self._quantity

    @quantity.setter
    def quantity(self, value):
        if value < 1:
            raise ValueError("Quantity must be at least 1")
        self._quantity = value

    @property
    def price(self):
        return self._price

    @price.setter
    def price(self, value):
        if value < 0:
            raise ValueError("Price cannot be negative")
        self._price = value

class Cart:
    def __init__(self, user_id, items=None):
        self._id = None
        self.user_id = user_id
        self.items = items or []  # List of CartItem objects
        self.total = 0

    @property
    def id(self):
        return self._id

    @property
    def user_id(self):
        return self._user_id

    @user_id.setter
    def user_id(self, value):
        self._user_id = value

    @property
    def items(self):
        return self._items

    @items.setter
    def items(self, value):
        if not isinstance(value, list):
            raise ValueError("Items must be a list")
        self._items = value
        self._calculate_total()

    def _calculate_total(self):
        self.total = sum(item.price * item.quantity for item in self.items) 