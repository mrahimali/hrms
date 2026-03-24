from rest_framework import serializers
from .models import Attendance
from employees.models import Employee

class AttendanceSerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(source="employee.full_name", read_only=True)

    class Meta:
        model = Attendance
        fields = "__all__"

    def validate(self, data):
        employee = data.get("employee")
        date = data.get("date")

        if Attendance.objects.filter(employee=employee, date=date).exists():
            raise serializers.ValidationError(
                "Attendance already marked for this employee on this date."
            )

        return data
