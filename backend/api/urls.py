from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'ranking', views.RankingViewSet, basename='ranking')
router.register(r'partners', views.PartnerViewSet, basename='partners')
router.register(r'hero_items', views.HeroSectionViewSet, basename='hero-items')

urlpatterns = [
    path('', views.api_overview, name='api-overview'),
    path('hero/', views.hero_singleton, name='hero'),
    path('tutorial/', views.tutorial_singleton, name='tutorial'),
    path('', include(router.urls)),
]
