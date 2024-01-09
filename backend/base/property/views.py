import jwt
import json
from django.shortcuts import render
from django.http import JsonResponse, FileResponse
from rest_framework.decorators import api_view
from django.db.models import Avg
import base64
from django.conf import settings
from django.contrib.auth.models import User

from .models import Property, PropertyPhoto, Rating, RentalRequest

@api_view(['POST'])
def addPhoto(request):

    if request.method != "POST":
        return JsonResponse({"error": "POST request required."}, status=400)
    
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
def properties(request):
    if request.method == 'GET':
        # Get properties in range [start, end], if not specified, give first 50
        start = int(request.GET.get('start', 0))
        end = int(request.GET.get('end', start + 50))
        property = [property.serialize() for property in Property.objects.all().order_by('id')[start:end]]
        if len(property) == 0:
            return JsonResponse({"message": "No more content"}, status=204)
        
        return JsonResponse(property, safe=False, status=200)

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
            title=data['title'],
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

@api_view(['GET', 'POST'])
def requestRental(request, propertyID):
    """
    GET: Returns the status of the rental request for the given property
    POST: Makes a requestRental object with the given propertyID and the user
    """
    if request.method == 'GET':
        property = Property.objects.get(id=propertyID)
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

        return JsonResponse({'status': status}, status=200)
    
    if request.method == "POST":
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