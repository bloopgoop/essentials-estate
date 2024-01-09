from django.test import TestCase, Client
from django.contrib.auth.models import User
from .models import Property, PropertyPhoto, Rating, RentalRequest
import jwt


# COPILOT CREATED THESE TESTS, use them as a reference for creating your own tests

class ViewTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(username='testuser', password='12345')
        self.property = Property.objects.create(
            owner=self.user,
            address='123 Test St',
            city='Test City',
            state='TS',
            zip='12345',
            title='Test Property',
            rent='1000',
            description='Test Description',
            bedrooms='2',
            bathrooms='1',
            garage='1',
            sqft='1000',
            lotsize='1000',
            stars=0,
            type='Test Type',
        )
        self.token = jwt.encode({'user_id': self.user.id}, 'secret', algorithm='HS256')

    def test_add_photo(self):
        response = self.client.post('/addPhoto/', {
            'descriptions': '["Test Description"]',
            'token': self.token,
            'propertyID': self.property.id,
        }, format='json')
        self.assertEqual(response.status_code, 200)

    def test_get_properties(self):
        response = self.client.get('/getProperties/')
        self.assertEqual(response.status_code, 200)

    def test_get_property(self):
        response = self.client.get(f'/getProperty/{self.property.id}/')
        self.assertEqual(response.status_code, 200)

    def test_request_rental(self):
        response = self.client.post(f'/requestRental/{self.property.id}/', {
            'Authorization': self.token,
        }, format='json')
        self.assertEqual(response.status_code, 200)

    def test_add_rating(self):
        response = self.client.post(f'/addRating/{self.property.id}/', {
            'stars': '5',
            'token': self.token,
        }, format='json')
        self.assertEqual(response.status_code, 200)