from django.db import models
from django.conf import settings
# from ..api.models import CustomUser
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator


# Create your models here.

class Property(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    rented_to = models.ForeignKey(User, on_delete=models.CASCADE, related_name='rented_to', null=True)
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
        ])
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.title
    
    def serialize(self):
        status = {
            0 : "Pending", 
            1 : "Approved",
            2 : "Rejected",
        }

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
#             'photos': [photo.getPath() for photo in PropertyPhoto.objects.filter(property=self.id)], WAS FROM JOAN-BRANCH
            'status': status[self.status]
            'photos': [{"img":photo.getPath(), "description":photo.description} for photo in PropertyPhoto.objects.filter(property=self.id)],
        }
    
class PropertyPhoto(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    photo = models.ImageField(upload_to='images/')
    description = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.property.title
    
    def serialize(self):
        return {
            'id': self.id,
            'property': self.property.id,
            'photo': self.photo.name,
            'description': self.description,
        }
    
    def getPath(self):
        return "http://localhost:8000" + settings.MEDIA_URL + self.photo.name
    
class Rating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE) 
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    stars = models.IntegerField(validators=[
            MaxValueValidator(5),
            MinValueValidator(0)
        ])
    comment = models.CharField(max_length=255, blank=True)
    date = models.DateTimeField(auto_now_add=True)

    def serialize(self):
        return {
            # 'user': self.user.id,
            # 'property': self.property.id,
            'stars': self.stars,
            'comment': self.comment,
        }
      
class RentalRequest(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    approved = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.user.username + "wants to rent out property id" + self.property.id + ":" + self.property.description
    
    def serialize(self):
        return {
            'id': self.id,
            'property': self.property.id,
            'user': self.user.username,
            'date': self.date,
        }