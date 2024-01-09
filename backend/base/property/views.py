import jwt
import json
from django.shortcuts import render
from django.http import JsonResponse, FileResponse
from rest_framework.decorators import api_view
from django.db.models import Avg
import base64
from django.conf import settings
from django.contrib.auth.models import User
from django.contrib.auth.models import Group
from .decorators import allowed_users
from .models import Property, PropertyPhoto, Rating, RentalRequest

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
        print(data)

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
            status=data['status']
        )
        try:
            property.save()
            id = property.id
                
            return JsonResponse({'id': property.id, 'message': 'Property added successfully'}, status=200)
        
        except:
            return JsonResponse({'message': 'Error adding property'}, status=400)
        
        

@api_view(['GET'])
def getProperty(request, pk):
    """
    Returns a JSON object containing the property data with the given id
    Status field is added to the JSON object to indicate if the user has 
    requested to rent the property
    """

    property = Property.objects.get(id=pk)

    try:
        access_token = request.headers['Authorization']
        token_data = jwt.decode(access_token, settings.SECRET_KEY, algorithms=['HS256'])
        owner = User.objects.get(id=token_data['user_id'])
        rentalRequest = RentalRequest.objects.filter(property=property, user=owner)
        if owner == property.owner:
            status = 'owner'
        elif rentalRequest:
            status = 'approved' if rentalRequest.latest('date').approved else 'pending'
        else:
            status = 'none'
    except KeyError:
        status = 'none'

    propertyObject = property.serialize()
    propertyObject['status'] = status
    return JsonResponse(propertyObject, safe=False)    

@api_view(['POST'])
def requestRental(request, propertyID):
    """
    Makes a requestRental object with the given propertyID and the user
    """
    try:
        access_token = request.headers['Authorization']
        token_data = jwt.decode(access_token, settings.SECRET_KEY, algorithms=['HS256'])
        user = User.objects.get(id=token_data['user_id'])

        data = request.POST
        property=Property.objects.get(id=propertyID)

        # Check if user already has a rental request for this property
        if not RentalRequest.objects.filter(
            property=Property.objects.get(id=propertyID),
            user=user,
            is_active=False,
            approved=False,
        ).exists():
            return JsonResponse({'message': 'Rental request already made'}, status=400)
        
        rentalRequest = RentalRequest.objects.create(
            property=Property.objects.get(id=propertyID),
            user=user,
        )
        
        try:
            rentalRequest.save()
            return JsonResponse({'message': 'Rental request added successfully'}, status=200)
        except:
            return JsonResponse({'message': 'Error adding rental request'}, status=400)
        
    except KeyError:
        return JsonResponse({'message': 'Bad request'}, status=400)
    
@api_view(['GET', 'POST'])
def addRating(request, property_id):
    if request.method == 'GET':
        try:
            average_value = Rating.objects.filter(property=Property.objects.get(id=property_id)).aggregate(Avg('stars'))['stars__avg']
            rating = [rating.serialize() for rating in Rating.objects.filter(property=Property.objects.get(id=property_id))]
            return JsonResponse({'average_value': average_value,
                                 'ratings': rating})
        except ValueError:
            return JsonResponse({'error': 'Invalid propertyID'}, status=400)
        
    elif request.method == 'POST':
        data = request.POST
        payload = jwt.decode(data['token'], settings.SECRET_KEY, algorithms=['HS256'])

        rating = Rating.objects.create(
            property=Property.objects.get(id=property_id),
            stars=data['stars'],
            comment=data['comment'],
            user=User.objects.get(id=payload['user_id'])
        )

        try:
            rating.save()
            id = rating.id
            return JsonResponse({'id': id, 'message': 'Rating has been posted'}, status=200)
        except:
            return JsonResponse({'message': 'Error adding property'}, status=400)

@api_view(['POST'])
@allowed_users(allowed_roles=['admin'])
def checkGroup(request, group_name):
    try: 
        return JsonResponse({'group': group_name })
    except:
        return JsonResponse({'message': 'Error'}, status=400)
    
@api_view(['GET', 'POST'])
def reviewProperty(request):
  try:
    if request.method == 'GET':
        return JsonResponse([property.serialize() for property in Property.objects.all() if property.status == 0], safe=False)
    
    elif request.method == 'POST':
        data = request.POST
        property_instance = Property.objects.get(id=data['propertyID'])
        property_instance.status = data["status"]
        property_instance.save()
        return JsonResponse([property.serialize() for property in Property.objects.all() if property.status == 0], safe=False)
  except:
    return JsonResponse({'message': 'Error adding property'}, status=400)
