from django.db import models
from django.conf import settings
# from ..api.models import CustomUser
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator


# Create your models here.

class Property(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owned_properties')
    renter = models.ForeignKey(User, on_delete=models.CASCADE, related_name='rented_properties', null=True)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=2)
    zip = models.CharField(max_length=10)
    rent = models.DecimalField(max_digits=10, decimal_places=2)
    title = models.CharField(max_length=255)
    description = models.TextField()
    bedrooms = models.IntegerField()
    bathrooms = models.IntegerField()
    garage = models.IntegerField()
    sqft = models.IntegerField()
    lotsize = models.DecimalField(max_digits=5, decimal_places=2)
    stars = models.DecimalField(max_digits=2, decimal_places=1)
    type = models.CharField(max_length=50)
    status = models.IntegerField(validators=[
            MaxValueValidator(2),
            MinValueValidator(0)
        ], default=0)
    is_rentable = models.BooleanField(default=False)

    def __str__(self):
        return self.title
    
    def serialize(self):
        # status = {
        #     0 : "Pending", 
        #     1 : "Approved",
        #     2 : "Rejected",
        # }

        return {
            'id': self.id,
            'owner': self.owner.username,
            'ownerID': self.owner.id,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'zip': self.zip,
            'rent': self.rent,
            'title': self.title,
            'description': self.description,
            'bedrooms': self.bedrooms,
            'bathrooms': self.bathrooms,
            'garage': self.garage,
            'sqft': self.sqft,
            'lotsize': self.lotsize,
            'stars': self.stars,
            'type': self.type,
            'photos': [photo.serialize() for photo in self.photos.all()],
            'status': self.status,
            'is_rentable': self.is_rentable,
        }
    
class PropertyPhoto(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='photos')
    photo = models.ImageField(upload_to='images/')
    description = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.property.title
    
    def serialize(self):
        return {
            'id': self.id,
            'property': self.property.id,
            'photo': "http://localhost:8000" + settings.MEDIA_URL + self.photo.name,
            'description': self.description,
        }
    
class Rating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews') 
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='reviews')
    stars = models.IntegerField(validators=[
            MaxValueValidator(5),
            MinValueValidator(0)
        ])
    comment = models.CharField(max_length=255, blank=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username + " rated " + self.property.title + " " + str(self.stars) + " stars"
    
    def is_valid_rating(self):
        return (0 <= self.stars <= 5) and (self.user != self.property.owner)
    
    def serialize(self, user_id=False):
        return {
            'id' : self.id,
            'user': self.user.username,
            'userID': self.user.id,
            'property': self.property.id,
            'stars': self.stars,
            'comment': self.comment,
            'date': self.date,
            'same_user': self.user.id == user_id,
        }

class RentalRequest(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='rental_requests')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='rental_requests')
    date = models.DateTimeField(auto_now_add=True)
    approved = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True) # True if the request is pending or approved, False if rejected

    def __str__(self):
        return self.user.username + "wants to rent out property id" + self.property.id + ":" + self.property.description
    
    def serialize(self):
        return {
            'id': self.id,
            'property': self.property.id,
            'user': self.user.username,
            'date': self.date,
            'approved': self.approved,
            'is_active': self.is_active,
        }
    
    def is_valid_rental_request(self):
        return self.user != self.property.owner