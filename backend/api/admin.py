from django.contrib import admin
from .models import HeroSection, Ranking, Partner, Tutorial


@admin.register(HeroSection)
class HeroSectionAdmin(admin.ModelAdmin):
    list_display = ['title_prefix', 'title_gradient', 'cta_text', 'updated_at']
    readonly_fields = ['updated_at']


@admin.register(Ranking)
class RankingAdmin(admin.ModelAdmin):
    list_display = ['name', 'school', 'progress', 'order', 'created_at']
    list_editable = ['progress', 'order']
    search_fields = ['name', 'school']
    ordering = ['-progress']


@admin.register(Partner)
class PartnerAdmin(admin.ModelAdmin):
    list_display = ['name', 'website', 'order', 'is_active']
    list_editable = ['order', 'is_active']
    search_fields = ['name']


@admin.register(Tutorial)
class TutorialAdmin(admin.ModelAdmin):
    list_display = ['title', 'video_url', 'updated_at']
    readonly_fields = ['updated_at']
