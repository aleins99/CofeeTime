from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User, Group
from django.contrib.auth.hashers import make_password


class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Productos
        fields = '__all__'


class PedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pedidos
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    group_name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'group_name']

    def get_group_name(self, obj):
        group = Group.objects.filter(user=obj).first()
        return group.name if group else None
