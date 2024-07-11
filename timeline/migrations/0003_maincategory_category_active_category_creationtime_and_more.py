# Generated by Django 4.0.6 on 2022-09-27 19:46

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('timeline', '0002_remove_person_category_person_category'),
    ]

    operations = [
        migrations.CreateModel(
            name='MainCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('categoryname', models.CharField(max_length=60)),
                ('creationTime', models.DateTimeField(default=datetime.datetime.now)),
                ('active', models.BooleanField(default=False)),
                ('description', models.TextField(blank=True, max_length=1000)),
            ],
        ),
        migrations.AddField(
            model_name='category',
            name='active',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='category',
            name='creationTime',
            field=models.DateTimeField(default=datetime.datetime.now),
        ),
        migrations.AlterField(
            model_name='category',
            name='category',
            field=models.CharField(max_length=60),
        ),
        migrations.AlterField(
            model_name='person',
            name='category',
            field=models.ManyToManyField(blank=True, related_name='InCategory', to='timeline.category'),
        ),
        migrations.AlterField(
            model_name='person',
            name='level',
            field=models.IntegerField(default=5),
        ),
        migrations.CreateModel(
            name='CategoryStatistics',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('plays', models.IntegerField(default=0)),
                ('avarge', models.IntegerField()),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='timeline.category')),
            ],
        ),
        migrations.AddField(
            model_name='category',
            name='motherCategory',
            field=models.ManyToManyField(blank=True, related_name='RegularCategory', to='timeline.maincategory'),
        ),
    ]