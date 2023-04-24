from django.contrib import admin
from .models import *


@admin.register(Productos)
class ProductosAdmin(admin.ModelAdmin):
    list_display = ('descripcion', 'precio')
    search_fields = ['descripcion', 'precio']
   # list_filter = ('descripcion')


@admin.register(Pedidos)
class PedidosAdmin(admin.ModelAdmin):
    list_display = ('descripcion', 'fecha', 'cantidad', 'costo')
    search_fields = ['descripcion']


admin.site.register(Usuario)
