from rest_framework import permissions


class isAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.groups.first() == None:
            return False
        if request.user.groups.first().name == "admin":
            print("entra")
            return True
        return False


class IsRecepcionista(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.groups.first() == None:
            return False
        if request.user.groups.first().name == "recepcionista":
            return True
        return False


class IsRecepcionistaOrCocinero(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.groups.first() == None:
            return False
        if request.user.groups.first().name == "recepcionista" or request.user.groups.first().name == "cocinero":
            return True
        return False


class IsRecepcionistaOrAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.groups.first() == None:
            return False
        if request.user.groups.first().name == "recepcionista" or request.user.groups.first().name == "admin":
            return True
        return False
