# Generated by Django 4.0.6 on 2022-10-12 10:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('timeline', '0007_alter_category_average'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='average',
            field=models.DecimalField(decimal_places=1, default=0, max_digits=10),
        ),
    ]
