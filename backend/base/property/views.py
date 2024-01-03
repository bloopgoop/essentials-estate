import jwt
import json
from django.shortcuts import render
from django.http import JsonResponse, FileResponse
from rest_framework.decorators import api_view
import base64
from django.conf import settings
from django.contrib.auth.models import User

from .models import Property, PropertyPhoto

@api_view(['GET', 'POST'])
def addPhoto(request):
    if request.method == 'GET':
        photos = PropertyPhoto.objects.filter(property=Property.objects.get(id=77))
        paths = []
        for photo in photos:
            paths.append(photo.getPath())
            print(photo.serialize())

        return JsonResponse(paths, safe=False)

    if request.method == 'POST':
        data = request.POST
        files = request.FILES

        descriptions = json.loads(data['descriptions'])
        token_data = jwt.decode(data['token'], settings.SECRET_KEY, algorithms=['HS256'])

        # Check if user is owner of property
        property = Property.objects.get(id=data['propertyID'])
        if token_data['user_id'] != property.owner.id:
            return JsonResponse({'message': 'Unauthorized'}, status=403)

        for index, file in enumerate(files):
            photo = PropertyPhoto.objects.create(
                property=Property.objects.get(id=data['propertyID']),
                photo=files[file],
                description=descriptions[index]
            )
            try:
                photo.save()
            except:
                return JsonResponse({'message': 'Error adding photo'}, status=400)
            
        return JsonResponse({'message': 'Photo(s) added successfully'}, status=200)

@api_view(['GET', 'POST'])
def getProperties(request):
    if request.method == 'GET':
        return JsonResponse([property.serialize() for property in Property.objects.all()], safe=False)
    
    elif request.method == 'POST':
        data = request.POST

        token_data = jwt.decode(data['token'], settings.SECRET_KEY, algorithms=['HS256'])
        owner = User.objects.get(id=token_data['user_id'])

        property = Property.objects.create(
            owner=owner,
            address=data['address'],
            city=data['city'],
            state=data['state'],
            zip=data['zip'],
            rent=data['rent'],
            description=data['description'],
            bedrooms=data['bedrooms'],
            bathrooms=data['bathrooms'],
            garage=data['garages'],
            sqft=data['sqft'],
            lotsize=data['lotsize'],
            stars=0,
            type=data['type'],
        )
        try:
            property.save()
            id = property.id
                
            return JsonResponse({'id': property.id, 'message': 'Property added successfully'}, status=200)
        
        except:
            return JsonResponse({'message': 'Error adding property'}, status=400)
        
        

@api_view(['GET'])
def getProperty(request, pk):
    return JsonResponse(Property.objects.get(id=pk).serialize())
