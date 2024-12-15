class Order:
    def __init__(self, id, user_id, products, total_amount, status, created_at):
        self._id = id
        self.user_id = user_id
        self.products = products  # List các sản phẩm [{product_id, quantity, price}]
        self.total_amount = total_amount
        self.status = status  # "pending", "confirmed", "shipped", "delivered", "cancelled"
        self.created_at = created_at

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
    def products(self):
        return self._products

    @products.setter
    def products(self, value):
        if not isinstance(value, list):
            raise ValueError("Products must be a list")
        self._products = value

    @property
    def total_amount(self):
        return self._total_amount

    @total_amount.setter
    def total_amount(self, value):
        if value < 0:
            raise ValueError("Total amount cannot be negative")
        self._total_amount = value

    @property
    def status(self):
        return self._status

    @status.setter
    def status(self, value):
        valid_statuses = ["pending", "confirmed", "shipped", "delivered", "cancelled"]
        if value not in valid_statuses:
            raise ValueError(f"Status must be one of {valid_statuses}")
        self._status = value

    @property
    def created_at(self):
        return self._created_at

    @created_at.setter
    def created_at(self, value):
        self._created_at = value 