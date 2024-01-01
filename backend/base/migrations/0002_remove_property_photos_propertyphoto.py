# Generated by Django 4.2.6 on 2023-12-24 18:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='property',
            name='photos',
        ),
        migrations.CreateModel(
            name='PropertyPhoto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('photo', models.ImageField(upload_to='photos/%Y/%m/%d/')),
                ('property', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.property')),
            ],
        ),
    ]
