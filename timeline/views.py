from unicodedata import category
from urllib import response
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

from rest_framework.response import Response
from . models import *
from . serializers import *

import re
import json



# Basic Api-request for verifing data

# Main Category
class ListMainCategory(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = MainCategory.objects.all().order_by('categoryname')
    serializer_class = MainCategorySerializer

class DetailMainCategory(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = MainCategory.objects.all()
    serializer_class = MainCategorySerializer

# Category
class ListCategory(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Category.objects.all().order_by('plays')
    serializer_class = CategorySerializer

class DetailCategory(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    
# Object / Persons
class ListPerson(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Person.objects.all()
    serializer_class = PersonSerializer

class DetailPerson(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Person.objects.all()
    serializer_class = PersonSerializer    


# Get 10 random Persons for that requested category
@api_view(['GET'])
@permission_classes([IsAuthenticatedOrReadOnly])
def random_persons(request, pk):
    if request.method == 'GET':
        all_persons = Person.objects.filter(category=pk).order_by('?')
        persons = []
        birth = []
        # Filter out same value/birth
        for person in all_persons:
            if len(persons) == 10:
               break
            else:
                if not person.born in birth:
                    persons.append(person)
                    birth.append(person.born)  
               
        serializer = PersonSerializer(persons, many=True)
        return Response(serializer.data)


# Returns the persons in challenger mode
@api_view(['GET'])
@permission_classes([IsAuthenticatedOrReadOnly])
def challenge_persons(request, pks):
    if request.method == 'GET':
        person_ids = re.findall(r'\d+',pks)

        persons = Person.objects.filter(pk__in=person_ids).order_by('?')
        serializer = PersonSerializer(persons, many=True)
        
        return Response(serializer.data)


# Returns All categories from a Main Category
@api_view(['GET'])
@permission_classes([IsAuthenticatedOrReadOnly])
def filter_categories(request, pk):
    if request.method == 'GET':
        categories = Category.objects.filter(motherCategory=pk)
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)


# Update Data after a game played
@api_view(['PUT'])
@csrf_exempt 
def data_update(request, pk):
    if request.method == 'PUT':
        data = json.loads(request.body)
        category = Category.objects.get(pk=pk)

        #Calc new avg and update
        temptot = category.plays * category.average   
        temptot += data['points']['totalPoints']
        category.plays += + 1
        category.average = temptot / category.plays         
        category.save()
   
        return Response()