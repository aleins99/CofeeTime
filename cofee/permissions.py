from rest_framework import permissions


class isAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.groups.filter(name='admin').first():
            return True
        return False


class IsRecepcionista(permissions.BasePermission):
    def has_permission(self, request, view):
        print("request.user", request.user)
        print("request.user.groups", request.user.groups)
        print("request.user.groups.filter(name='recepcionista')",
              request.user.groups.filter(name='recepcionista'))
        print(self)
        print(view)
        if request.user.groups.filter(name='recepcionista').first():
            print("Existe??")
            return True
        return False


class IsCocinero(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.groups.filter(name='cocinero').first():
            return True
        return False


class IsRecepcionistaOrCocinero(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.groups.filter(name='recepcionista').first() or request.user.groups.filter(name='cocinero').first():
            return True
        return False
