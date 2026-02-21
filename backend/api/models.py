from django.db import models


class HeroSection(models.Model):
    title_prefix_uz = models.CharField(max_length=200, default="")
    title_prefix_ru = models.CharField(max_length=200, default="")
    title_gradient_uz = models.CharField(max_length=200, default="")
    title_gradient_ru = models.CharField(max_length=200, default="")
    description_uz = models.TextField(default="")
    description_ru = models.TextField(default="")
    cta_text_uz = models.CharField(max_length=100, default="Ro'yxatdan o'tish")
    cta_text_ru = models.CharField(max_length=100, default="Купить билет")
    cta_link = models.URLField(default="https://bondolympiad.uz/register/")
    hero_image = models.ImageField(upload_to='hero/', blank=True, null=True)
    target_datetime = models.DateTimeField(blank=True, null=True)
    event_date = models.CharField(max_length=50, blank=True, null=True)
    event_time = models.CharField(max_length=50, blank=True, null=True)
    event_location_uz = models.CharField(max_length=255, blank=True, null=True)
    event_location_ru = models.CharField(max_length=255, blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Hero Section"

    def __str__(self):
        return f"Hero: {self.title_prefix_uz or self.title_prefix_ru}"


class Ranking(models.Model):
    name = models.CharField(max_length=200)
    school = models.CharField(max_length=300)
    progress = models.IntegerField(default=0)
    avatar = models.URLField(blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-progress', 'order']
        verbose_name = "Ranking Student"

    def __str__(self):
        return f"{self.name} - {self.progress}%"


class Partner(models.Model):
    name_uz = models.CharField(max_length=200, default="")
    name_ru = models.CharField(max_length=200, default="")
    logo = models.ImageField(upload_to='partners/', blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']
        verbose_name = "Partner"

    def __str__(self):
        return self.name_uz or self.name_ru


class Tutorial(models.Model):
    title_uz = models.CharField(max_length=200, default="")
    title_ru = models.CharField(max_length=200, default="")
    subtitle_uz = models.TextField(default="")
    subtitle_ru = models.TextField(default="")
    video_url = models.URLField(blank=True, null=True)
    thumbnail = models.URLField(blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Tutorial"

    def __str__(self):
        return self.title_uz or self.title_ru
