from django.shortcuts import get_object_or_404, render
from rest_framework import viewsets
from .serializers import *
from .models import *
from django.contrib.auth.models import User, Group
import json
from rest_framework.response import Response
# import status
from rest_framework import status
from django.http import JsonResponse, QueryDict
from .permissions import IsRecepcionista, IsRecepcionistaOrCocinero, isAdmin


class ProductoView(viewsets.ModelViewSet):
    serializer_class = ProductoSerializer
    queryset = Productos.objects.all()

    def get_permissions(self):
        permission_classes = []
        if self.action == "retrieve" or self.action == "list":
            permission_classes = [IsRecepcionistaOrCocinero]
        if permission_classes.__len__() == 0:
            permission_classes = [isAdmin]
        return [permission() for permission in permission_classes]


class PedidoView(viewsets.ModelViewSet):
    serializer_class = PedidoSerializer
    queryset = Pedidos.objects.all()

    def get_permissions(self):
        if self.action == "retrieve" or self.action == "list" or self.action == "update":
            permission_classes = [IsRecepcionistaOrCocinero]
        if self.action == "create" or self.action == "partial_update" or self.action == "destroy":
            permission_classes = [IsRecepcionista]
        return [permission() for permission in permission_classes]


class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = Usuario.objects.all()

    def get_permissions(self):
        permission_classes = [isAdmin]
        return [permission() for permission in permission_classes]

    def create(self, request, *args, **kwargs):
        # update the request data

        serializer = self.get_serializer(data=request.data)

        print("REQUEEEEEST", request.data)
        if serializer.is_valid():
            group = Group.objects.get(
                id=request.data['group'])

            print("SERIALIZER", serializer)
            self.perform_create(serializer)
            if request.data['group'] == None or request.data['group'] == '':
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            if group == None:
                # return error
                return Response(status=status.HTTP_400_BAD_REQUEST)
            serializer.instance.groups.add(group)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        pk = kwargs['pk']
        user = get_object_or_404(Usuario, pk=pk)
        group = Group.objects.get(id=request.data['group'])
        user.groups.clear()
        user.groups.add(group)
        return super().update(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
        pk = kwargs['pk']
        user = get_object_or_404(Usuario, pk=pk)
        group = Group.objects.get(id=request.data['group'])
        user.groups.clear()
        user.groups.add(group)
        return super().partial_update(request, *args, **kwargs)
