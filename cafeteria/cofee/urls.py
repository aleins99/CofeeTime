from django.conf.urls.static import static
from django.conf import settings
from django.urls import path, include
from cofee import views
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView, TokenRefreshView)

router = routers.DefaultRouter()
router.register(r'pedidos', views.PedidoView, 'pedidos')
router.register(r'productos', views.ProductoView, 'productos')
router.register(r'usuarios', views.UserView, 'usuarios')
getUsuario = views.UserView.as_view({
    'get': 'retrieve',
})

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    path('api/usuarios/<int:pk>/', getUsuario, name='getUsuario')
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
