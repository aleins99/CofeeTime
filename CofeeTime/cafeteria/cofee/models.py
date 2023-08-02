from django.db import models
from django.contrib.auth.models import User, Group
import uuid


def upload_to(instance, filename):
    return 'productos/{filename}'.format(filename=filename)


class Productos(models.Model):
    creator = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="listings", null=True)
    descripcion = models.CharField(max_length=100, verbose_name='Descripcion')
    precio = models.FloatField(verbose_name='Precio')
    imagen = models.ImageField(upload_to="upload_to", null=True, blank=True)

    def __str__(self):
        return str(self.descripcion)

    class Meta:
        verbose_name = 'producto'
        verbose_name_plural = 'productos'


class Pedidos(models.Model):

    pedidos = models.TextField(verbose_name='Pedidos', null=True, blank=True)
    fecha = models.DateTimeField(blank=True, null=True, auto_now_add=True)
    cantidad = models.FloatField(
        verbose_name='Cantidad', null=True, blank=True)
    cliente = models.CharField(max_length=100, null=True)
    descripcion_tiempo = models.TextField(null=True, blank=True)
    pedido = (
        ('1', 'Listo'),
        ('2', 'En proceso'),
    )
    pedido = models.CharField(
        max_length=1, choices=pedido, blank=True, null=True)

    def __str__(self):
        return str(self.pedidos)

    class Meta:
        verbose_name = 'pedido'
        verbose_name_plural = 'pedidos'
        ordering = ['fecha']


class Grupo(Group):
    def __str__(self):
        return str(self.name)


class Usuario(User):
    group = models.ForeignKey(
        Grupo, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return str(self.username)

    class Meta:
        verbose_name = 'usuario'
        verbose_name_plural = 'usuarios'
        ordering = ['username']
