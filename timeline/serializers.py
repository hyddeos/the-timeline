from rest_framework import serializers
from .models import *

class MainCategorySerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'categoryname',
            'creationTime',
            'description',
        )
        model = MainCategory


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'category',
            'plays',
            'average',
            'date',
            'NrInCate',
            'value',
            'description',
        )
        model = Category

class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'name',
            'born',
            'quote',
            'category',
            'level',
        )
        model = Person

