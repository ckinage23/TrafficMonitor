from rest_framework import serializers
from .models import Country, City, VehicleTypeDistribution

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = '__all__'

class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = '__all__'

class VehicleTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = VehicleTypeDistribution
        fields = ('total_vehicles', 'car', 'trucks', 'buses', 'motorcycles', 'other')

class CountryNestedSerializer(serializers.ModelSerializer):
    cities = CitySerializer(many=True, read_only=True)
    vehicle_types = VehicleTypeSerializer(read_only=True)
    class Meta:
        model = Country
        fields = ('id','name','traffic_index', 'cities', 'vehicle_types')

