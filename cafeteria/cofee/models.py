from django.db import models
from django.contrib.auth.models import User, Group


class Productos(models.Model):
    id = models.IntegerField(primary_key=True)
    descripcion = models.CharField(max_length=100, verbose_name='Descripcion')
    precio = models.FloatField(verbose_name='Precio')

    def __str__(self):
        return str(self.descripcion)

    class Meta:
        verbose_name = 'producto'
        verbose_name_plural = 'productos'
        ordering = ['id']


class Pedidos(models.Model):
    id = models.IntegerField(primary_key=True)
    descripcion = models.ForeignKey(Productos, on_delete=models.CASCADE)
    fecha = models.DateTimeField()
    cantidad = models.FloatField(verbose_name='Cantidad')

    def costo(self):
        return (self.cantidad * self.descripcion.precio)

    pedido = (
        ('1', 'Listo'),
        ('2', 'En proceso'),
    )
    pedido = models.CharField(max_length=1, choices=pedido)

    def __str__(self):
        return str(self.descripcion)

    class Meta:
        verbose_name = 'pedido'
        verbose_name_plural = 'pedidos'
        ordering = ['descripcion']


class Usuario(User):
    group = models.ForeignKey(
        Group, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return str(self.username)

    class Meta:
        verbose_name = 'usuario'
        verbose_name_plural = 'usuarios'
        ordering = ['username']
