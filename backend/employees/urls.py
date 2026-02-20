from django.urls import path
from .views import EmployeesView, EmployeeDeleteView

urlpatterns = [
    path('', EmployeesView.as_view(), name='get-or-create-employee'),
    path('/<int:pk>', EmployeeDeleteView.as_view(), name='delete-employee'),
]
