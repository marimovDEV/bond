from django.db import models


class HeroSection(models.Model):
    title_prefix = models.CharField(max_length=200, default="Yanvar Kubogi:")
    title_gradient = models.CharField(max_length=200, default="Bond: Aql Janggi 2024")
    description = models.TextField(default="")
    cta_text = models.CharField(max_length=100, default="Ro'yxatdan o'tish")
    cta_link = models.URLField(default="https://bondolympiad.uz")
    countdown_days = models.IntegerField(default=2)
    countdown_hours = models.IntegerField(default=15)
    countdown_minutes = models.IntegerField(default=4)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Hero Section"

    def __str__(self):
        return f"Hero: {self.title_prefix}"


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
    name = models.CharField(max_length=200)
    logo = models.ImageField(upload_to='partners/', blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']
        verbose_name = "Partner"

    def __str__(self):
        return self.name


class Tutorial(models.Model):
    title = models.CharField(max_length=200, default="Video Qo'llanma")
    subtitle = models.TextField(default="")
    video_url = models.URLField(blank=True, null=True)
    thumbnail = models.URLField(blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Tutorial"

    def __str__(self):
        return self.title
