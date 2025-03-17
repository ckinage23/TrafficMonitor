# TrafficMonitor

**Overview**

This project is a web application built using Django (Python) for the backend and ReactJS for the frontend. The application is containerized using Docker and deployed on an Amazon EC2 instance.

**Steps to run application on local server:**
1. Clone the repository
2. In a Terminal, navigate to TrafficMonitor/trafficmonitoringapp
3. Run command 'pip install requirements.txt' to install dependencies
4. Run command 'python manage.py migrate' to setup the database
5. Run command 'python manage.py runserver' to start the backend server on localhost:8000
6. For building frontend, navigate to TrafficMonitor/Frontend/traffic-monitoring-dashboard
7. Run pnpm install to install frontend dependencies
8. Run pnpm build
9. Run pnpm start to run the frontend application on localhost:3000
10. To run the frontend on the Python server, perform the following steps:<br>
a) Copy the static files folder from TrafficMonitor/Frontend/traffic-monitoring-dashboard/build and paste it to TrafficMonitor/trafficmonitoringapp<br>
b) Copy the index.html from TrafficMonitor/Frontend/traffic-monitoring-dashboard/build and paste it inside TrafficMonitor/trafficmonitoringapp/trafficmonitoringapp/templates<br>
c) Restart the Python server and open localhost:8000 on browser

**Steps to update data through APIs:**
1. Go to localhost:8000/api/api-root, this will give you the list of all available APIs
2. Navigating to api/countries-all-data will give you a list of all the countries along with the city wise data and vehicle type distribution data nested withing each country
3. You can get the ids here, which we would be needing for updating data
4. For more details on the required payloads and expected responses, I have created an API contract on postman. I will be pushing the JSON file of the API collection and will also be sharing the access on email.

For pushing new changes, commit changes to TrafficMonitor/main branch. 
These changes will go through a CI/CD pipeline, and will be containerized in a Docker file and deployed to an Amazon EC2instance, all using GitHub actions.
Link to hosted application: http://ec2-51-21-223-183.eu-north-1.compute.amazonaws.com/
