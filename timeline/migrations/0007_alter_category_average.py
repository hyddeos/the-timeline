# Generated by Django 4.0.6 on 2022-10-10 18:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('timeline', '0006_category_average_category_plays_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='average',
            field=models.DecimalField(decimal_places=3, default=0, max_digits=10),
        ),
    ]