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
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth.hashers import make_password


class ProductoView(viewsets.ModelViewSet):

    serializer_class = ProductoSerializer
    queryset = Productos.objects.all()
    parser_classes = (MultiPartParser, FormParser)

    def get_permissions(self):
        permission_classes = list()
        if self.action == "list":
            permission_classes = [IsRecepcionistaOrAdmin]
        if permission_classes.__len__() == 0:
            permission_classes = [isAdmin]
        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)


class PedidoView(viewsets.ModelViewSet):
    serializer_class = PedidoSerializer
    queryset = Pedidos.objects.all()

    def get_permissions(self):
        permission_classes = list()
        if self.action == "retrieve" or self.action == "list" or self.action == "update" or self.action == "partial_update":
            permission_classes = [IsRecepcionistaOrCocinero]
        if self.action == "create" or self.action == "destroy":
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

    def update(self, request, *args, **kwargs):
        data = request.data
        try:
            if data['password'] != None:
                data['password'] = make_password(data['password'])
        except Exception as e:
            print(e)
        try:
            if data['group_name'] != None or data['group_name'] != "":
                usuario = User.objects.get(pk=kwargs['pk'])
                usuario.groups.clear()
                usuario.groups.add(Group.objects.get(name=data['group_name']))
        except Exception as e:
            print(e)
        return super().update(request, *args, **kwargs)
