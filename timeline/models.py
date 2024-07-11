from email.policy import default
from unicodedata import category
from xml.sax.handler import property_xml_string
from django.db import models
from datetime import datetime


# Create your models here.

class MainCategory(models.Model):
    categoryname = models.CharField(max_length=60)
    creationTime = models.DateTimeField(default=datetime.now)
    active = models.BooleanField(default=False)
    description = models.TextField(max_length=1000, blank=True)

    def __str__(self):
        return f'{self.pk}, {self.categoryname}'
        


class Category(models.Model):
    motherCategory = models.ManyToManyField(MainCategory, blank=True, related_name="RegularCategory")
    category = models.CharField(max_length=60)
    creationTime = models.DateTimeField(default=datetime.now)
    value = models.CharField(max_length=60, default="Birth")
    description = models.TextField(max_length=1000, blank="Sort the cards according the year of birth.")
    active = models.BooleanField(default=False)
    plays = models.IntegerField(default=0 )
    average = models.DecimalField(default=0, max_digits=10, decimal_places=1)

    def __str__(self):
        return f'{self.pk}, {self.category},  Nr in Cat: {getNrInCategory(self.pk)}'

    @property
    def getPersons(self):
        return f'Persons, {getPersonsInCategory(self.pk)}'

    @property
    def date(self):
        return f'{self.creationTime.strftime("%b %d %Y")}'
    
    @property
    def NrInCate(self):
        return getNrInCategory(self.pk)



class Person(models.Model):
    name = models.CharField(max_length=50)
    born = models.IntegerField()
    quote = models.CharField(max_length=240, blank=True)
    category = models.ManyToManyField(Category, blank=True, related_name="InCategory")
    level = models.IntegerField(default=5)
    creationTime = models.DateTimeField(default=datetime.now)

    def __str__(self):
        return f'{self.name}, {self.born}'
    
    def birthYear(self):
        return f'{self.born}'


def getPersonsInCategory(category):
    persons = Person.objects.all().filter(category=category)
    return persons

def getNrInCategory(category):
    persons = Person.objects.all().filter(category=category).count()
    return persons




