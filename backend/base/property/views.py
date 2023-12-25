import json
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view

from .models import Property, PropertyPhoto

# @api_view(['GET', 'POST'])
# def addPhoto(request):
#     if request.method == 'GET':
#         return JsonResponse({'message': 'GET request received'})
#     if request.method == 'POST':
#         print(request.body)
#         print("request.files: ", request.FILES)
#         data = json.loads(request.body)
#         property = Property.objects.get(id=data['id'])
#         photo = PropertyPhoto.objects.create(
#             property=property,
#             photo=data['photo'],
#             description=data['description']
#         )
#         try:
#             photo.save()
#             return JsonResponse({'message': 'Photo added successfully'}, status=200)
#         except:
#             return JsonResponse({'message': 'Error adding photo'}, status=400)

@api_view(['GET', 'POST'])
def getProperties(request):
    if request.method == 'GET':
        return JsonResponse([property.serialize() for property in Property.objects.all()], safe=False)
    elif request.method == 'POST':
        data = json.loads(request.body)
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
            return JsonResponse({'id': property.id, 'message': 'Property added successfully'}, status=200)
        except:
            return JsonResponse({'message': 'Error adding property'}, status=400)

@api_view(['GET'])
def getProperty(request, pk):
    return JsonResponse(Property.objects.get(id=pk).serialize())
