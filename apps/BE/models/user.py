class User:
    def __init__(self, id, username, password, role):
        self._id = id
        self._username = username
        self._password = password
        self._role = role

    # Getter and Setter for id
    @property
    def id(self):
        return self._id

    @id.setter
    def id(self, value):
        self._id = value

    # Getter and Setter for username
    @property
    def username(self):
        return self._username

    @username.setter
    def username(self, value):
        if not isinstance(value, str) or len(value) < 3:
            raise ValueError("Username must be a string with at least 3 characters")
        self._username = value

    # Getter and Setter for password
    @property
    def password(self):
        return self._password

    @password.setter
    def password(self, value):
        if not isinstance(value, str) or len(value) < 6:
            raise ValueError("Password must be at least 6 characters long")
        self._password = value

    # Getter and Setter for role
    @property
    def role(self):
        return self._role

    @role.setter
    def role(self, value):
        valid_roles = ['admin', 'user', 'guest']
        if value not in valid_roles:
            raise ValueError(f"Role must be one of {valid_roles}")
        self._role = value