from django.urls import path
from . import views

urlpatterns = [
    path('', views.properties, name='properties'),
    path('<int:pk>/', views.getProperty, name='property'),
    path('photo/', views.addPhoto, name='addphoto'),
    path('userProperty/', views.getUserProperty, name='userProperty'),

    path('rating/<int:property_id>', views.ratings, name='rating'),
    path('checkGroup/<str:group_name>', views.checkGroup, name='checkGroup'),
    path('reviewProperty/<int:admin>', views.reviewProperty, name='review'),
  
    path('requestRental/<int:propertyID>/', views.requestRental, name='requestRental'),

    path('user/', views.getUser, name='user'),
]