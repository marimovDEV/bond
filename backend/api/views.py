from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import HeroSection, Ranking, Partner, Tutorial
from .serializers import HeroSectionSerializer, RankingSerializer, PartnerSerializer, TutorialSerializer


class HeroSectionViewSet(viewsets.ModelViewSet):
    queryset = HeroSection.objects.all()
    serializer_class = HeroSectionSerializer


@api_view(['GET', 'PUT', 'PATCH'])
def hero_singleton(request):
    """Get or update the Hero section config (supports multiple olympiads)."""
    if request.method == 'GET':
        olympiads = HeroSection.objects.all().order_by('order')
        return Response({
            'olympiads': HeroSectionSerializer(olympiads, many=True, context={'request': request}).data
        })
    
    # For simplicity in local dev, PUT/PATCH could update a specific one or handle bulk
    # But for now, let's keep GET as the primary sink
    return Response({"message": "Use /api/hero_items/ for CRUD operations"}, status=status.HTTP_200_OK)


class RankingViewSet(viewsets.ModelViewSet):
    queryset = Ranking.objects.all()
    serializer_class = RankingSerializer


class PartnerViewSet(viewsets.ModelViewSet):
    queryset = Partner.objects.filter(is_active=True)
    serializer_class = PartnerSerializer


@api_view(['GET', 'PUT', 'PATCH'])
def tutorial_singleton(request):
    """Get or update the single Tutorial section config."""
    tutorial, _ = Tutorial.objects.get_or_create(pk=1)
    if request.method == 'GET':
        return Response(TutorialSerializer(tutorial).data)
    serializer = TutorialSerializer(tutorial, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def api_overview(request):
    """API root - returns all available endpoints."""
    return Response({
        'hero': '/api/hero/',
        'ranking': '/api/ranking/',
        'partners': '/api/partners/',
        'tutorial': '/api/tutorial/',
    })
