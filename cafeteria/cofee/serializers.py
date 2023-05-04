from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User, Group
from django.contrib.auth.hashers import make_password


class ProductoSerializer(serializers.ModelSerializer):
    imagen = serializers.ImageField(required=False)
    creator = serializers.ReadOnlyField(source='creator.username')
    creator_id = serializers.ReadOnlyField(source='creator.id')

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
        fields = ['id', 'username', 'password',
                  'first_name', 'last_name', 'group_name']

    def get_group_name(self, obj):
        group = Group.objects.filter(user=obj).first()
        return group.name if group else None

    def create(self, validated_data):
        password = validated_data.pop('password')
        validated_data['password'] = make_password(password)
        return super().create(validated_data)
