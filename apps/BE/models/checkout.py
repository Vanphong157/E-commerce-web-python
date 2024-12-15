from datetime import datetime

class PaymentInfo:
    def __init__(self, payment_method, card_number=None, card_holder=None, expiry_date=None):
        self.payment_method = payment_method  # "cod" hoặc "card"
        self.card_number = card_number
        self.card_holder = card_holder
        self.expiry_date = expiry_date

    @property
    def payment_method(self):
        return self._payment_method

    @payment_method.setter
    def payment_method(self, value):
        valid_methods = ["cod", "card"]
        if value not in valid_methods:
            raise ValueError(f"Payment method must be one of {valid_methods}")
        self._payment_method = value

class ShippingInfo:
    def __init__(self, full_name, address, phone, email):
        self.full_name = full_name
        self.address = address
        self.phone = phone
        self.email = email

class Checkout:
    def __init__(self, user_id, cart_id, shipping_info, payment_info, order_notes=None):
        self._id = None
        self.user_id = user_id
        self.cart_id = cart_id
        self.shipping_info = shipping_info
        self.payment_info = payment_info
        self.order_notes = order_notes
        self.created_at = datetime.utcnow()
        self.status = "pending"  # pending, processing, completed, failed

    @property
    def id(self):
        return self._id

    @property
    def status(self):
        return self._status

    @status.setter
    def status(self, value):
        valid_statuses = ["pending", "processing", "completed", "failed"]
        if value not in valid_statuses:
            raise ValueError(f"Status must be one of {valid_statuses}")
        self._status = value 