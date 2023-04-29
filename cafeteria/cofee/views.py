from django.shortcuts import get_object_or_404, render
from rest_framework import viewsets
from .serializers import *
from .models import *
from django.contrib.auth.models import User, Group
import json
from rest_framework.response import Response
# import status
from rest_framework import status
from .permissions import IsRecepcionista, IsRecepcionistaOrCocinero, isAdmin, IsRecepcionistaOrAdmin
from django.core import serializers


class ProductoView(viewsets.ModelViewSet):
    serializer_class = ProductoSerializer
    queryset = Productos.objects.all()

    def get_permissions(self):
        permission_classes = list()
        if self.action == "retrieve" or self.action == "list":
            permission_classes = [IsRecepcionistaOrAdmin]
        if permission_classes.__len__() == 0:
            permission_classes = [isAdmin]
        return [permission() for permission in permission_classes]

    def create(self, request):
        data = request.data
        data['id'] = Productos.objects.all().count() + 1
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Producto creado correctamente"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"message": "Error al crear el producto"}, status=status.HTTP_400_BAD_REQUEST)


class PedidoView(viewsets.ModelViewSet):
    serializer_class = PedidoSerializer
    queryset = Pedidos.objects.all()

    def get_permissions(self):
        permission_classes = list()
        if self.action == "retrieve" or self.action == "list" or self.action == "update":
            permission_classes = [IsRecepcionistaOrCocinero]
        if self.action == "create" or self.action == "partial_update" or self.action == "destroy":
            permission_classes = [IsRecepcionista]
        return [permission() for permission in permission_classes]


class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def create(self, request):
        data = request.data
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            usuario = User.objects.get(username=data['username'])
            usuario.groups.add(Group.objects.get(name=data['group_name']))
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

        else:
            return Response({"message": "Error al crear el usuario"}, status=status.HTTP_400_BAD_REQUEST)
