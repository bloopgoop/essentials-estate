from django.contrib import admin

from .property.models import Property, PropertyPhoto

# Register your models here.
admin.site.register(Property)
admin.site.register(PropertyPhoto)