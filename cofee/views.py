from django.shortcuts import get_object_or_404, render
from rest_framework import viewsets
from .serializers import *
from .models import *
from django.contrib.auth.models import User, Group
import json
from rest_framework.response import Response
# import status
from rest_framework import status
from django.http import JsonResponse


class ProductoView(viewsets.ModelViewSet):
    serializer_class = ProductoSerializer
    queryset = Productos.objects.all()


class PedidoView(viewsets.ModelViewSet):
    serializer_class = PedidoSerializer
    queryset = Pedidos.objects.all()


class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            if request.data['group'] == None or request.data['group'] == '':
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            group = Group.objects.filter(name=request.data['group']).first()
            if group == None:
                # return error
                return Response(status=status.HTTP_400_BAD_REQUEST)
            serializer.data['group'] = request.data['group']
            serializer.instance.groups.add(group)
            headers = self.get_success_headers(serializer.data)
            dictionary = serializer.data
            dictionary['group'] = request.data['group']

            return Response(dictionary, status=status.HTTP_201_CREATED, headers=headers)

        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        if pk == None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        queryset = User.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        dictionary = {
            'username': user.username,
            'group': user.groups.first().name
        }

        return Response(dictionary, status=status.HTTP_200_OK)
