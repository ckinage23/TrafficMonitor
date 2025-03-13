from django.urls import path
from . import views

urlpatterns = [
    path('', views.api_root, name='api-root'),
    path('countries-list/', views.countries, name='countries'),
    path('countries-all-data/', views.countries_all_data, name='countries-all-data'),
    path('cities-list/<str:pk>', views.cities, name='cities-list'),
    path('vehicle-type-distribution/<str:pk>', views.vehicle_types, name='vehicle-type-distribution'),
    path('add-country/', views.add_country, name='add-country'),
    path('add-city/', views.add_city, name='add-city'),
    path('add-vehicle-distribution/', views.add_vehicle_distribution, name='add-vehicle-distribution'),
    path('update-country/<str:pk>', views.update_country, name='update-country'),
    path('update-city/<str:pk>', views.update_city, name='update-city'),
    path('update-vehicle-distribution/<str:pk>', views.update_vehicle_distribution, name='update-vehicle-distribution'),
    path('delete-country/<str:pk>', views.delete_country, name='delete-country'),
    path('delete-city/<str:pk>', views.delete_city, name='delete-city'),
    path('delete-vehicle-distribution/<str:pk>', views.delete_vehicle_distribution, name='delete-vehicle-distribution'),
]