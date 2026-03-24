from django.urls import path
from .views import AttandenceView, delete_attandance, attendance_summary_today

urlpatterns = [
    path('', AttandenceView.as_view()),
    path('/<int:pk>/', AttandenceView.as_view()),              # ← yeh add karo
    path('delete/<int:pk>/', delete_attandance, name='delete-attendance'),
    path('/attendance-summary-today/', attendance_summary_today, name='attandance-summary'),
]
