from django.core.management.base import BaseCommand
from api.models import HeroSection, Ranking, Tutorial, Partner
from django.utils.timezone import make_aware
from datetime import datetime


class Command(BaseCommand):
    help = 'Seed the database with initial data'

    def handle(self, *args, **kwargs):
        # Hero
        HeroSection.objects.all().delete()
        HeroSection.objects.create(
            pk=1,
            title_prefix_uz="Maktabgacha yoshdagi",
            title_prefix_ru="Дошкольный возраст",
            title_gradient_uz="bolalar uchun...",
            title_gradient_ru="для детей...",
            description_uz="Maktabgacha yoshdagi bolalar uchun maxsus olimpiada bosqichi.",
            description_ru="Специальный этап олимпиады для детей дошкольного возраста.",
            cta_text_uz="Chipta sotib olish",
            cta_text_ru="Купить билет",
            cta_link="https://bondolympiad.uz/register/",
            hero_image='hero/image.png',
            target_datetime=make_aware(datetime(2026, 2, 28, 10, 0, 0)),
            event_date="28.02.2026",
            event_time="10:00",
            event_location_uz="DATA xalqaro maktabi",
            event_location_ru="Международная школа DATA",
            order=0
        )
        HeroSection.objects.create(
            pk=2,
            title_prefix_uz="BOND",
            title_prefix_ru="BOND",
            title_gradient_uz="Olimpiadasi",
            title_gradient_ru="Олимпиада",
            description_uz="Navbatdagi katta musobaqa uchun saralash bosqichi.",
            description_ru="Отборочный этап для следующего крупного соревнования.",
            cta_text_uz="Chipta sotib olish",
            cta_text_ru="Купить билет",
            cta_link="https://bondolympiad.uz/register/",
            hero_image='hero/image.png',
            target_datetime=make_aware(datetime(2026, 3, 1, 10, 0, 0)),
            event_date="01.03.2026",
            event_time="10:00",
            event_location_uz="Data school",
            event_location_ru="Школа Data",
            order=1
        )
        self.stdout.write(self.style.SUCCESS('HeroSection seeded.'))

        # Tutorial
        Tutorial.objects.get_or_create(
            pk=1,
            defaults={
                'title_uz': "Video Qo'llanma",
                'title_ru': "Видео руководство",
                'subtitle_uz': "Sizni platformadan foydalanish qulayligi uchun maxsus tayyorlangan video-darslik.",
                'subtitle_ru': "Специально подготовленный видеоурок для удобства использования платформы.",
                'thumbnail': "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1470&q=80"
            }
        )
        self.stdout.write(self.style.SUCCESS('Tutorial seeded.'))

        # Ranking
        students = [
            {"name": "Azizbek Karimov", "school": "IDUM 4, Toshkent", "progress": 98,
             "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Aziz"},
            {"name": "Madina Alieva", "school": "Prezident Maktabi", "progress": 95,
             "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Madina"},
            {"name": "Sardor Umurzakov", "school": "AL Xorazmiy", "progress": 92,
             "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Sardor"},
            {"name": "Guli Shodiya", "school": "1-Gimnaziya", "progress": 89,
             "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Guli"},
            {"name": "Jasur Bahtiyorov", "school": "School 21", "progress": 87,
             "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Jasur"},
        ]
        for i, s in enumerate(students):
            Ranking.objects.get_or_create(name=s['name'], defaults={**s, 'order': i})
        self.stdout.write(self.style.SUCCESS(f'{len(students)} Ranking students seeded.'))

        # Partners
        partners = [
            {"name_uz": "Cambridge Assessment", "name_ru": "Cambridge Assessment", "order": 1},
            {"name_uz": "British Council", "name_ru": "British Council", "order": 2},
            {"name_uz": "IDP IELTS", "name_ru": "IDP IELTS", "order": 3},
            {"name_uz": "Uzbekistan Youth Union", "name_ru": "Союз молодежи Узбекистана", "order": 4},
        ]
        for p in partners:
            Partner.objects.get_or_create(name_uz=p['name_uz'], defaults=p)
        self.stdout.write(self.style.SUCCESS(f'{len(partners)} Partners seeded.'))

        self.stdout.write(self.style.SUCCESS('Database seeded successfully!'))
