from django.db import models

# Create your models here.
class Country(models.Model):
    name = models.CharField(max_length=100)
    traffic_index = models.IntegerField()
    def __str__(self):
        return self.name

class City(models.Model):
    country = models.ForeignKey(Country, on_delete = models.CASCADE, related_name='cities')
    name = models.CharField(max_length=100)
    average_travel_time_per_10km = models.IntegerField()
    congestion = models.CharField(max_length = 15)
    traffic_index = models.IntegerField()
    def __str__(self):
        return self.name

class VehicleTypeDistribution(models.Model):
    country = models.OneToOneField(Country, on_delete = models.CASCADE, related_name='vehicle_types')
    total_vehicles = models.BigIntegerField()
    car = models.IntegerField()
    motorcycles = models.IntegerField()
    trucks = models.IntegerField()
    buses = models.IntegerField()
    other = models.IntegerField()
    def __str__(self):
        return self.country
