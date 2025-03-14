FROM node:18 as build-stage
WORKDIR /code

COPY ./Frontend/traffic-monitoring-dashboard/ /code/Frontend/traffic-monitoring-dashboard/

WORKDIR /code/Frontend/traffic-monitoring-dashboard

#Install pnpm - performant node package manager
RUN npm install -g pnpm

#Installing packages for frontend app
RUN pnpm install

#Building frontend
RUN pnpm run build

#Build backend
FROM python:3.13.2

#Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
WORKDIR /code

# Copy backend requirements file
COPY ./requirements.txt /code/

#Copy Django project to the container
COPY ./trafficmonitoringapp /code/trafficmonitoringapp/

RUN pip install -r ./requirements.txt

#Copy the frontend build to the container
COPY --from=build-stage /code/Frontend/traffic-monitoring-dashboard/build /code/trafficmonitoringapp/static/
COPY --from=build-stage /code/Frontend/traffic-monitoring-dashboard/build/static /code/trafficmonitoringapp/static/
COPY --from=build-stage /code/Frontend/traffic-monitoring-dashboard/build/index.html /code/trafficmonitoringapp/trafficmonitoringapp/templates/index.html

#Run Django Migration command
RUN python ./trafficmonitoringapp/manage.py migrate

# Collect static files
RUN python ./trafficmonitoringapp/manage.py collectstatic --no-input

#Expose the port
EXPOSE 80

WORKDIR /code/trafficmonitoringapp

CMD ["gunicorn", "trafficmonitoringapp.wsgi:application", "--bind", "0.0.0.0:8000"]