from django.urls import path
from . import views

urlpatterns = [
    path('', views.properties, name='properties'),
    path('<int:pk>/', views.getProperty, name='property'),
    path('userProperty/', views.getUserProperty, name='userProperty'),
    path('photo/', views.photo, name='photo'),
    path('photo/delete/', views.deletePhoto, name='deletePhoto'),

    path('rating/<int:property_id>', views.ratings, name='rating'),
    path('reviewProperty/<int:admin>', views.reviewProperty, name='review'),

    path('requestRental/<int:propertyID>/',
         views.requestRental, name='requestRental'),

    path('getRequest/', views.getRequest, name="getRequest"),
    path('user/', views.getUser, name='user'),
]
