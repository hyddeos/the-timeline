from django.contrib import admin
from . models import *

from django.urls import reverse
from django.utils.http import urlencode

class MainCategoryAdmin(admin.ModelAdmin):
    list_display =['id', 'categoryname', 'creationTime', 'active']
    list_filter = ['active', ]
    search_fields = ['categoryname']
    

class CategoryAdmin(admin.ModelAdmin):
    list_display =['id', 'category', 'creationTime', 'active', "In_Cat"]
    list_filter = ["motherCategory", 'active' ]
    search_fields = ['category']
    
    def In_Cat(self, obj):
        count = Person.objects.filter(category=obj).count()
        return count



class PersonAdmin(admin.ModelAdmin):
    list_display =['id', 'name', 'born', 'creationTime']
    list_filter = ['category', ]
    search_fields = ['name']
    

# Register your models here.
admin.site.register(Category, CategoryAdmin)
admin.site.register(Person, PersonAdmin)
admin.site.register(MainCategory, MainCategoryAdmin) 