from django.urls import path
from . import views

urlpatterns = [
    path('', views.getProperties, name='properties'),
    path('<int:pk>/', views.getProperty, name='property'),
    path('photo/', views.addPhoto, name='addphoto'),
    path('rating/<int:property_id>', views.addRating, name='rating'),
    
    path('checkAdmin/<str:group_name>', views.checkAdmin, name='checkAdmin'),
]