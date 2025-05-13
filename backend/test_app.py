import unittest
from app import app
import json

class TestTravelGuideAPI(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_health_check(self):
        response = self.app.get('/api/health')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data['status'], 'healthy')
        self.assertEqual(data['service'], 'travel-guide-api')

    def test_get_countries(self):
        response = self.app.get('/api/countries')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn('status', data)
        self.assertIn('data', data)
        self.assertEqual(data['status'], 'success')

    def test_get_cities_without_country_id(self):
        response = self.app.get('/api/cities')
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertEqual(data['status'], 'error')

    def test_get_city_details_invalid_id(self):
        response = self.app.get('/api/city/invalid_id')
        self.assertEqual(response.status_code, 500)  # Will fail if API key is not set

if __name__ == '__main__':
    unittest.main()
