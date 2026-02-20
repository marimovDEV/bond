# BOND OLYMPIAD

Loyiha ikki qismdan iborat: `frontend` (React/Vite) va `backend` (Django REST Framework).

## Loyiha tuzilmasi

```
bond/
├── frontend/       # React + Vite + Tailwind CSS
│   ├── src/
│   │   ├── admin/          # Admin panel sahifalari
│   │   ├── components/     # UI komponentlar
│   │   ├── context/        # ContentContext (ma'lumotlar)
│   │   └── App.jsx
│   └── package.json
│
└── backend/        # Django REST Framework
    ├── api/            # Asosiy app (models, views, serializers)
    ├── config/         # Django sozlamalari va URL'lar
    ├── manage.py
    └── requirements.txt
```

---

## Frontend ishga tushirish

```bash
cd frontend
npm install
npm run dev
```

Sayt: [http://localhost:5174](http://localhost:5174)
Admin Panel: [http://localhost:5174/admin](http://localhost:5174/admin)

---

## Backend ishga tushirish

```bash
cd backend
python3 -m venv venv
source venv/bin/activate     # Windows: venv\Scripts\activate
pip install -r requirements.txt

python manage.py migrate
python manage.py seed_data    # Boshlang'ich ma'lumotlar
python manage.py createsuperuser
python manage.py runserver
```

API: [http://localhost:8000/api/](http://localhost:8000/api/)
Django Admin: [http://localhost:8000/admin/](http://localhost:8000/admin/)

---

## API Endpointlar

| Method | URL | Tavsif |
|---|---|---|
| GET/PUT | `/api/hero/` | Hero bo'limi ma'lumotlari |
| GET/PUT | `/api/tutorial/` | Tutorial (video) ma'lumotlari |
| GET/POST | `/api/ranking/` | O'quvchilar reytingi |
| GET/PUT/DELETE | `/api/ranking/{id}/` | Bitta o'quvchi |
| GET/POST | `/api/partners/` | Hamkorlar ro'yxati |
| GET/PUT/DELETE | `/api/partners/{id}/` | Bitta hamkor |

---

## Stack

**Frontend**: React 18, Vite, Tailwind CSS v4, Framer Motion, React Router DOM

**Backend**: Django 6, Django REST Framework, django-cors-headers, SQLite (dev), Pillow
