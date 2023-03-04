# Generated by Django 4.0 on 2023-01-01 09:03

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Announcement',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('PubDate', models.DateTimeField()),
                ('Title', models.CharField(max_length=200)),
                ('Description', models.TextField()),
                ('Price', models.PositiveBigIntegerField()),
                ('Type', models.CharField(max_length=200)),
                ('Category', models.IntegerField()),
                ('Wilaya', models.CharField(max_length=200)),
                ('Commune', models.CharField(max_length=100)),
                ('Adress', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('FirstName', models.CharField(max_length=100)),
                ('LastName', models.CharField(max_length=100)),
                ('Email', models.EmailField(max_length=254, primary_key=True, serialize=False)),
                ('PfP', models.URLField(max_length=250)),
                ('PhoneNumber', models.CharField(blank=True, max_length=20, validators=[django.core.validators.RegexValidator(message='PhoneNumber incorect', regex='0\\s*(0|5|6|7)(\\s*\\d){8}\\s*')])),
            ],
        ),
        migrations.CreateModel(
            name='Photo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='images')),
                ('announcement', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Backend.announcement')),
            ],
        ),
        migrations.CreateModel(
            name='Favourite',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('announcement', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Backend.announcement')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Backend.user')),
            ],
        ),
        migrations.AddField(
            model_name='announcement',
            name='Owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Backend.user'),
        ),
        migrations.CreateModel(
            name='Admin',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Me', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Backend.user')),
            ],
        ),
    ]
