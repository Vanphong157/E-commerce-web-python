class Category:
    def __init__(self, id, name, description, images):
        self._id = id
        self.name = name
        self.description = description
        self.images = images
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
    def description(self):
        return self._description

    @description.setter
    def description(self, value):
        self._description = value

    @property
    def images(self):
        return self._images

    @images.setter
    def images(self, value):
        self._images = value