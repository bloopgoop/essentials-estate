from django.test import TestCase, Client
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.test import APIClient
from .models import Property, PropertyPhoto, Rating, RentalRequest
import jwt
import json

class DatabaseTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        
        # Create users
        self.user1 = User.objects.create_user(username='testuser1', password='12345')
        self.user2 = User.objects.create_user(username='testuser2', password='12345')


        # Create properties
        self.property1 = Property.objects.create(
            owner=self.user1,
            address='123 Test St',
            city='Test City',
            state='TS',
            zip='12345',
            title='Test Property1',
            rent=100,
            description='Test Description1',
            bedrooms=2,
            bathrooms=1,
            garage=1,
            sqft=100,
            lotsize=100,
            stars=0,
            type='house',
        )
        self.property2 = Property.objects.create(
            owner=self.user1,
            address='456 Test St',
            city='Test City',
            state='TS',
            zip='12345',
            title='Test Property2',
            rent=200,
            description='Test Description2',
            bedrooms=2,
            bathrooms=1,
            garage=1,
            sqft=200,
            lotsize=200,
            stars=0,
            type='apartment',
        )

        # Create photos
        self.photo1 = PropertyPhoto.objects.create(
            property=self.property1,
            photo='images/property1.jpg',
        )

        # Create tokens
        self.token1 = jwt.encode({'user_id': self.user1.id}, 'secret', algorithm='HS256')
        self.token2 = jwt.encode({'user_id': self.user2.id}, 'secret', algorithm='HS256')

    def test_property_count(self):
        """ Test that the user has 2 properties """
        user = User.objects.get(username='testuser1')
        self.assertEqual(user.owned_properties.count(), 2)

    def test_property_photos(self):
        """ Test that property1 has 1 photo """
        property = Property.objects.get(title='Test Property1')
        self.assertEqual(property.photos.count(), 1)

    def test_no_property_photos(self):
        """ Test that property2 has no photos """
        property = Property.objects.get(title='Test Property2')
        self.assertEqual(property.photos.count(), 0)

    def test_rating_stars_out_of_range(self):
        """ Test that ratings are between 0 and 5 """
        with self.assertRaises(ValidationError):
            Rating.objects.create(
                property=self.property2,
                user=self.user1,
                stars=6,
            ).full_clean()

        with self.assertRaises(ValidationError):
            Rating.objects.create(
                property=self.property1,
                user=self.user2,
                stars=-1,
            ).full_clean()

    def test_valid_rating(self):
        """ Test that rating is valid """
        rating = Rating.objects.create(
            property=self.property1,
            user=self.user2,
            stars=3,
        )
        self.assertTrue(rating.is_valid_rating())
        

    def test_invalid_rating(self):
        """ Test that rating is invalid """
        rating = Rating.objects.create(
                property=self.property1,
                user=self.user1,
                stars=1,
                )
        self.assertFalse(rating.is_valid_rating())

    def test_rental_request(self):
        """ Test that rental request is valid """
        rental = RentalRequest.objects.create(
            property=self.property1,
            user=self.user2,
        )
        self.assertTrue(rental.is_valid_rental_request())

    def test_invalid_rental_request(self):
        """ Test that rental request is invalid """
        rental = RentalRequest.objects.create(
            property=self.property1,
            user=self.user1,
        )
        self.assertFalse(rental.is_valid_rental_request())

class ViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='12345')
        self.property = Property.objects.create(
            owner=self.user1,
            address='123 Test St',
            city='Test City',
            state='TS',
            zip='12345',
            title='Test Property1',
            rent=100,
            description='Test Description1',
            bedrooms=2,
            bathrooms=1,
            garage=1,
            sqft=100,
            lotsize=100,
            stars=0,
            type='house',
        )

    def test_add_photo(self):
        self.client.login(username='testuser', password='12345')
        with open('path/to/your/test/image.jpg', 'rb') as img:
            response = self.client.post(reverse('addPhoto'), {'propertyID': self.property.id, 'descriptions': json.dumps(['Test Description']), 'file': img}, format='multipart')
        self.assertEqual(response.status_code, 200)

    def test_properties(self):
        response = self.client.get(reverse('properties'))
        self.assertEqual(response.status_code, 200)

    def test_get_property(self):
        response = self.client.get(reverse('getProperty', args=[self.property.id]))
        self.assertEqual(response.status_code, 200)

    def test_request_rental(self):
        self.client.login(username='testuser', password='12345')
        response = self.client.post(reverse('requestRental', args=[self.property.id]))
        self.assertEqual(response.status_code, 200)

    def test_add_rating(self):
        self.client.login(username='testuser', password='12345')
        response = self.client.post(reverse('addRating', args=[self.property.id]), {'stars': 5, 'comment': 'Great!', 'token': 'your_token_here'})
        self.assertEqual(response.status_code, 200)

    def test_check_group(self):
        self.client.login(username='testuser', password='12345')
        response = self.client.post(reverse('checkGroup', args=['admin']))
        self.assertEqual(response.status_code, 200)

    def test_review_property(self):
        self.client.login(username='testuser', password='12345')
        response = self.client.post(reverse('reviewProperty'), {'propertyID': self.property.id, 'status': 1})
        self.assertEqual(response.status_code, 200)