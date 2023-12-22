from django.db import models

# Create your models here.

class Property(models.Model):
    owner = models.CharField(max_length=100)
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
    photos = models.JSONField()  # Storing URLs of photos in a JSON field
    stars = models.DecimalField(max_digits=2, decimal_places=1)
    type = models.CharField(max_length=50)

    def __str__(self):
        return self.title
    
    def serialize(self):
        return {
            'owner': self.owner,
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
            'photos': self.photos,
            'stars': self.stars,
            'type': self.type,
        }