# Generated by Django 5.1.7 on 2025-03-14 12:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='city',
            name='traffic_index',
            field=models.IntegerField(default=70),
            preserve_default=False,
        ),
    ]
