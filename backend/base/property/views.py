import jwt
import json
from django.shortcuts import render
from django.http import JsonResponse, FileResponse
from rest_framework.decorators import api_view
from django.db.models import Avg, Q
import base64
from django.conf import settings
from django.contrib.auth.models import User
from django.contrib.auth.models import Group
from .decorators import allowed_users
from .models import Property, PropertyPhoto, Rating, RentalRequest


@api_view(['POST'])
@allowed_users(allowed_roles=['common_user', 'admin'])
def photo(request):

    if request.method == 'POST':
        data = request.POST
        files = request.FILES
        descriptions = json.loads(data['descriptions'])

        # Check if user is owner of property
        property = Property.objects.get(id=data['propertyID'])
        if request.user != property.owner:
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


@api_view(['DELETE'])
@allowed_users(allowed_roles=['common_user', 'admin'])
def deletePhoto(request, photo_id):

    if request.method != "DELETE":
        return JsonResponse({"error": "Invalid  request method."}, status=400)

    photo = PropertyPhoto.objects.get(id=photo_id)

    # Check if user is owner of property
    property = Property.objects.get(id=photo.property.id)
    if request.user != property.owner:
        return JsonResponse({'message': 'Unauthorized'}, status=403)

    try:
        photo.delete()
        return JsonResponse({'message': 'Photo(s) deleted successfully'}, status=200)
    except:
        return JsonResponse({'message': 'Error deleting photo'}, status=400)


@api_view(['GET', 'POST'])
def properties(request):
    if request.method == 'GET':
        # Get properties in range [start, end], if not specified, give first 50
        start = int(request.GET.get('start', 0))
        end = int(request.GET.get('end', start + 50))
        property = [property.serialize() for property in Property.objects.filter(
            status=1).order_by('id')[start:end]]
        if len(property) == 0:
            return JsonResponse({"message": "No more content"}, status=204)

        return JsonResponse(property, safe=False, status=200)

    elif request.method == 'POST':
        data = request.POST

        # Decode jwt token to get user id
        token_data = jwt.decode(
            data['token'], settings.SECRET_KEY, algorithms=['HS256'])
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
            return JsonResponse({'message': 'Error adding property'}, status=500)


@api_view(['GET', 'PUT', 'DELETE'])
def getProperty(request, pk):
    try:
        if request.method == 'GET':
            """
            Returns a JSON object containing the property data with the given id
            """
            property = Property.objects.get(id=pk)
            return JsonResponse(property.serialize(), safe=False)

        elif request.method == 'PUT':
            property = Property.objects.get(id=pk)
            property.address = request.data["address"]
            property.city = request.data["city"]
            property.state = request.data["state"]
            property.zip = request.data["zip"]
            property.rent = request.data["rent"]
            property.bedrooms = request.data["bedrooms"]
            property.bathrooms = request.data["bathrooms"]
            property.garage = request.data["garage"]
            property.sqft = request.data["sqft"]
            property.lotsize = request.data["lotsize"]
            property.type = request.data["type"]
            property.description = request.data["description"]
            property.save()
            return JsonResponse({"message": "Property has been updated"}, status=200)

        elif request.method == 'DELETE':
            property = Property.objects.get(id=pk)
            property.delete()
            return JsonResponse({"message": "Property has been deleted"}, status=200)
    except Property.DoesNotExist:
        return JsonResponse({'message': 'Property does not exist'}, status=404)


@api_view(['GET', 'POST'])
@allowed_users(allowed_roles=['common_user', 'admin'])
def requestRental(request, propertyID):
    """
    GET: Returns the status of the rental request for the given property
    POST: Makes a requestRental object with the given propertyID and the user
    """
    if request.method == 'GET':
        property = Property.objects.get(id=propertyID)
        rentalRequest = RentalRequest.objects.filter(
            property=property, user=request.user)

        if request.user == property.owner:
            rental_status = 'owner'
        elif rentalRequest:
            rental_status = 'approved' if rentalRequest.latest(
                'date').approved else 'pending'
        else:
            rental_status = 'none'

        return JsonResponse({'rental_status': rental_status}, status=200)

    if request.method == "POST":
        property = Property.objects.get(id=propertyID)

        # Check if user already has a rental request for this property
        if RentalRequest.objects.filter(
            property=Property.objects.get(id=propertyID),
            user=request.user
        ).filter(
            Q(is_active=True) | Q(approved=True)
        ).exists():
            return JsonResponse({'message': 'Rental request already made'}, status=400)

        rentalRequest = RentalRequest.objects.create(
            property=Property.objects.get(id=propertyID),
            user=request.user,
        )

        try:
            rentalRequest.save()
            return JsonResponse({'message': 'Rental request added successfully'}, status=200)
        except:
            return JsonResponse({'message': 'Error adding rental request'}, status=500)


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def ratings(request, property_id):
    # Get user, issue if nonuser posting a comment
    # BUT should take the nonuser to loggin page

    # Unauthenticated user should be able to see ratings for a property
    if request.method == 'GET':
        try:
            average_value = Rating.objects.filter(property=Property.objects.get(
                id=property_id)).aggregate(Avg('stars'))['stars__avg']
            rating = [rating.serialize(-1) for rating in Rating.objects.filter(
                property=Property.objects.get(id=property_id))]
            return JsonResponse({'average_value': average_value,
                                 'ratings': rating})
        except ValueError:
            return JsonResponse({'error': 'Invalid propertyID'}, status=400)

    try:
        access_token = request.headers['Authorization']
        token_data = jwt.decode(
            access_token, settings.SECRET_KEY, algorithms=['HS256'])
        user_id = token_data['user_id']
    except:
        user_id = -1
        return JsonResponse({'error': 'Issue with retriving User'}, status=400)

    if request.method == 'POST':
        try:
            data = request.POST
            payload = jwt.decode(
                data['token'], settings.SECRET_KEY, algorithms=['HS256'])
            property = Property.objects.get(id=property_id)
            rating = Rating.objects.create(
                property=property,
                stars=data['stars'],
                comment=data['comment'],
                user=User.objects.get(id=payload['user_id'])
            )
            rating.save()

            property.stars = Rating.objects.filter(property=Property.objects.get(
                id=property_id)).aggregate(Avg('stars'))['stars__avg']
            property.save()
            id = rating.id
            return JsonResponse({'id': id, 'message': 'Rating has been posted'}, status=200)
        except:
            return JsonResponse({'message': 'Error adding property'}, status=400)

    elif request.method == 'PUT':
        try:
            # Checks if its the same user_id
            # Will ideally make it so that the user can only see update on their own posts
            if str(user_id) == request.data["userID"]:
                rating = Rating.objects.get(
                    id=request.data['id'], property=Property.objects.get(id=property_id))
                rating.comment = request.data['comment']
                rating.stars = request.data['stars']
                rating.save()
                return JsonResponse({'message': "Rating has been updated", "result": True}, status=200)
            else:
                return JsonResponse({'message': "WRONG USER, Rating has not been updated", "result": False}, status=401)
        except:
            return JsonResponse({'error': 'Error updating rating'}, status=404)

    elif request.method == 'DELETE':
        try:
            rating_id = request.data['id']
            # return JsonResponse({'message': 'Rating deleted successfully'}, status=200)
            if user_id == request.data['user_id']:
                rating = Rating.objects.get(
                    id=rating_id, property=Property.objects.get(id=property_id))
                rating.delete()
                return JsonResponse({'message': 'Rating deleted successfully'}, status=200)
            else:
                return JsonResponse({'message': "WRONG USER, Rating has not been updated", "result": False}, status=401)
        except:
            return JsonResponse({'error': 'Error deleting rating'}, status=404)


@api_view(['GET', 'POST'])
def reviewProperty(request, admin):
    try:
        access_token = request.headers['Authorization']
        token_data = jwt.decode(
            access_token, settings.SECRET_KEY, algorithms=['HS256'])
        user_id = token_data['user_id']
        if request.method == 'GET':
            if admin == 0:
                properties = Property.objects.filter(owner_id=user_id).order_by('status')
                return JsonResponse([property.serialize() for property in properties], safe=False)
            elif admin == 1:
                properties = Property.objects.all().order_by('status')
                return JsonResponse([property.serialize() for property in properties], safe=False)

        elif request.method == 'POST':
            data = request.POST
            property_instance = Property.objects.get(id=data['propertyID'])
            property_instance.status = data["status"]
            property_instance.save()
            return JsonResponse([property.serialize() for property in Property.objects.all() if property.status == 0], safe=False)
    except:
        return JsonResponse({'message': 'Error adding property'}, status=400)


@api_view(['GET'])
def getUserProperty(request):
    try:
        access_token = request.headers['Authorization']
        token_data = jwt.decode(
            access_token, settings.SECRET_KEY, algorithms=['HS256'])
        user_id = token_data['user_id']
        if request.method == 'GET':
            userProperties = [property.serialize(
            ) for property in Property.objects.filter(owner_id=user_id)]
            return JsonResponse({'properties': userProperties}, status=200)

    except:
        return JsonResponse({'message': 'Error getting user\'s property'}, status=400)


@api_view(['GET'])
def getUser(request):
    try:
        access_token = request.headers['Authorization']
        token_data = jwt.decode(
            access_token, settings.SECRET_KEY, algorithms=['HS256'])
        user_id = token_data['user_id']
        if request.method == 'GET':
            user = User.objects.get(id=user_id)
            user_data = {
                'id': user.id,
                'username': user.username,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'date_joined': user.date_joined,
                'is_superuser': user.is_superuser,
                'last_login': user.last_login,
                'email': user.email,
            }
            return JsonResponse({'user_data': user_data})
    except:
        return JsonResponse({'message': 'Error getting User data'}, status=400)


@api_view(['GET'])
def getRequest(request):
    try:
        access_token = request.headers['Authorization']
        token_data = jwt.decode(
            access_token, settings.SECRET_KEY, algorithms=['HS256'])
        user_id = token_data['user_id']

        rental_request = RentalRequest.objects.filter(user_id=user_id)
        properties = [request.property.serialize()
                      for request in rental_request]

        return JsonResponse({'properties': properties})
    except:
        return JsonResponse({'message': 'Error getting Requested Rentals'}, status=400)
