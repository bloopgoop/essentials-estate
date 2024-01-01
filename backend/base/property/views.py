import json
from django.shortcuts import render
from django.http import JsonResponse, FileResponse
from rest_framework.decorators import api_view
from django.db.models import Avg
import base64
import jwt
from django.conf import settings
from django.contrib.auth.models import User

from .models import Property, PropertyPhoto, Rating

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

        # decode JWT and compare the user to the owner of the property
        # if not the same, return 403
        # data['token'] <-decode this
        # if *user* != Property.objects.get(id=data['propertyID']).owner:
        #    return JsonResponse({'message': 'Unauthorized'}, status=403)


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
        print(data)

        property = Property.objects.create(
            owner=data['owner'],
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
            # for file in files:
            #     print("line 75", files[file])
            #     photo = PropertyPhoto.objects.create(
            #         property=Property.objects.get(id=id),
            #         photo=files[file],
            #         description="test"
            #     )
            #     try:
            #         photo.save()
            #     except:
            #         return JsonResponse({'message': 'Error adding photo'}, status=400)
                
            return JsonResponse({'id': property.id, 'message': 'Property added successfully'}, status=200)
        
        except:
            return JsonResponse({'message': 'Error adding property'}, status=400)
        
        

@api_view(['GET'])
def getProperty(request, pk):
    return JsonResponse(Property.objects.get(id=pk).serialize())

@api_view(['GET', 'POST'])
def addRating(request, property_id):
    if request.method == 'GET':
        data = request.GET
        print(data)
        try:
            average_value = Rating.objects.filter(property=Property.objects.get(id=property_id)).aggregate(Avg('stars'))['stars__avg']
            return JsonResponse({'average_value': average_value})
        except ValueError:
            return JsonResponse({'error': 'Invalid propertyID'}, status=400)
    elif request.method == 'POST':
        data = request.POST
        print(data['token'])
        payload = jwt.decode(data['token'], settings.SECRET_KEY, algorithms=['HS256'])
        print(payload)

        rating = Rating.objects.create(
            property=Property.objects.get(id=property_id),
            stars=data['stars'],
            user=User.objects.get(id=payload['user_id'])
        )

        try:
            rating.save()
            id = rating.id
            return JsonResponse({'id': rating.id, 'message': 'Rating has been posted'}, status=200)
        except:
            return JsonResponse({'message': 'Error adding property'}, status=400)
