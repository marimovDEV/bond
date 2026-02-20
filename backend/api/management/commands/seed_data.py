from django.core.management.base import BaseCommand
from api.models import HeroSection, Ranking, Tutorial, Partner


class Command(BaseCommand):
    help = 'Seed the database with initial data'

    def handle(self, *args, **kwargs):
        # Hero
        HeroSection.objects.get_or_create(
            pk=1,
            defaults={
                'title_prefix': "Yanvar Kubogi:",
                'title_gradient': "Bond: Aql Janggi 2024",
                'description': "Matematika, Ingliz Tili va Informatika Bilimlarini Sinashingiz\nSahrinda oflayn catmash va yordamchi o'zidagi onlini",
                'cta_text': "Ro'yxatdan o'tish",
                'cta_link': "https://bondolympiad.uz",
                'countdown_days': 2,
                'countdown_hours': 15,
                'countdown_minutes': 4,
            }
        )
        self.stdout.write(self.style.SUCCESS('HeroSection seeded.'))

        # Tutorial
        Tutorial.objects.get_or_create(
            pk=1,
            defaults={
                'title': "Video Qo'llanma",
                'subtitle': "Sizni platformadan foydalanish qulayligi uchun maxsus tayyorlangan video-darslik.",
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
            {"name": "Cambridge Assessment", "order": 1},
            {"name": "British Council", "order": 2},
            {"name": "IDP IELTS", "order": 3},
            {"name": "Uzbekistan Youth Union", "order": 4},
        ]
        for p in partners:
            Partner.objects.get_or_create(name=p['name'], defaults=p)
        self.stdout.write(self.style.SUCCESS(f'{len(partners)} Partners seeded.'))

        self.stdout.write(self.style.SUCCESS('Database seeded successfully!'))
