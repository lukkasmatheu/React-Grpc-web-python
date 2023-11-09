from unicodedata import name


class Person:
    def __init__(self,name,password,occupation):
        self.name = name
        self.occupation = occupation
        self.password = password

    @classmethod
    def from_dict(self, data):
        return self(data['name'], data['password'], data['occupation'])