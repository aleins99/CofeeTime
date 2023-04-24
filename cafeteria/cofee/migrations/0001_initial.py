# Generated by Django 4.1.8 on 2023-04-23 23:26

from django.conf import settings
import django.contrib.auth.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Productos',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('descripcion', models.CharField(max_length=100, verbose_name='Descripcion')),
                ('precio', models.FloatField(verbose_name='Precio')),
            ],
            options={
                'verbose_name': 'producto',
                'verbose_name_plural': 'productos',
                'ordering': ['id'],
            },
        ),
        migrations.CreateModel(
            name='Usuario',
            fields=[
                ('user_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('group', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='auth.group')),
            ],
            options={
                'verbose_name': 'usuario',
                'verbose_name_plural': 'usuarios',
                'ordering': ['username'],
            },
            bases=('auth.user',),
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Pedidos',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('fecha', models.DateTimeField()),
                ('cantidad', models.FloatField(verbose_name='Cantidad')),
                ('pedido', models.CharField(choices=[('1', 'Listo'), ('2', 'En proceso')], max_length=1)),
                ('descripcion', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cofee.productos')),
            ],
            options={
                'verbose_name': 'pedido',
                'verbose_name_plural': 'pedidos',
                'ordering': ['descripcion'],
            },
        ),
    ]