from django.urls import path
from . import views

urlpatterns = [
    path('', views.properties, name='properties'),
    path('<int:pk>/', views.getProperty, name='property'),
    path('photo/', views.photo, name='photo'),
    path('photo/delete/<int:photo_id>/', views.deletePhoto, name='deletePhoto'),

    path('rating/<int:property_id>', views.ratings, name='rating'),
    path('checkGroup/<str:group_name>', views.checkGroup, name='checkGroup'),
    path('reviewProperty/', views.reviewProperty, name='review'),
  
    path('requestRental/<int:propertyID>/', views.requestRental, name='requestRental'),
]