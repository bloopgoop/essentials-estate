import json
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view

from .models import Property

@api_view(['GET'])
def getProperty(request, pk):
    return JsonResponse(Property.objects.get(id=pk).serialize())

@api_view(['POST'])
def addProperty(request):
    data = json.loads(request.body)
    property = Property.objects.create(
        owner=data['owner'],
        address=data['address'],
        city=data['city'],
        state=data['state'],
        zip=data['zip'],
        rent=data['rent'],
        title=data['title'],
        description=data['description'],
        bedrooms=data['bedrooms'],
        bathrooms=data['bathrooms'],
        garage=data['garage'],
        sqft=data['sqft'],
        lotsize=data['lotsize'],
        photos=data['photos'],
        stars=data['stars'],
        type=data['type'],
    )
    return JsonResponse(property.serialize())