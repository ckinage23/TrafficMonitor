from django.core.serializers import serialize
from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import CountrySerializer, CitySerializer, VehicleTypeSerializer, CountryNestedSerializer
from .models import Country, City, VehicleTypeDistribution
# Create your views here.

def index(request):
    return render(request, 'index.html')

@api_view(['GET'])
def api_root(request):
    api_urls={
        'Country': '/countries-list/',
        'Cities': '/cities-list/<str:pk>/',
        'Vehicle Type Distribution': '/vehicle-type-distribution/<str:pk>'
    }
    return Response(api_urls)

@api_view(['GET'])
def countries(request):
    countries_list = Country.objects.all()
    serializer = CountrySerializer(countries_list, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def countries_all_data(request):
    countries_list = Country.objects.all()
    serializer = CountryNestedSerializer(countries_list, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def cities(request,pk):
    cities_list = City.objects.filter(country_id=pk)
    serializer = CitySerializer(cities_list, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def vehicle_types(request,pk):
    vehicle_types_list= VehicleTypeDistribution.objects.filter(country_id=pk)
    serializer = VehicleTypeSerializer(vehicle_types_list, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def add_country(request):
    serializer = CountrySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def add_city(request):
    serializer = CitySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def add_vehicle_distribution(request):
    serializer = VehicleTypeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def update_country(request,pk):
    country = Country.objects.get(id=pk)
    serializer = CountrySerializer(instance=country, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def update_city(request,pk):
    city = City.objects.get(id=pk)
    serializer = CitySerializer(instance=city, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def update_vehicle_distribution(request,pk):
    vehicle_obj = VehicleTypeDistribution.objects.get(id=pk)
    serializer = VehicleTypeSerializer(instance=vehicle_obj, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def delete_country(request, pk):
    country = Country.objects.get(id=pk)
    country.delete()
    return Response("Country has been deleted successfully!")

@api_view(['DELETE'])
def delete_city(request, pk):
    city = City.objects.get(id=pk)
    city.delete()
    return Response("City has been deleted successfully!")

@api_view(['DELETE'])
def delete_vehicle_distribution(request, pk):
    vehicle_distribution = VehicleTypeDistribution.objects.get(id=pk)
    vehicle_distribution.delete()
    return Response("Vehicle Distribution has been deleted successfully!")