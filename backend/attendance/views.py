from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Attendance, Employee
from .serializer import AttendanceSerializer
from rest_framework.decorators import api_view
from django.utils import timezone


class AttandenceView(APIView):

    def get(self, request):
        employee_id = request.query_params.get("employee")

        if employee_id:
            attendances = Attendance.objects.filter(employee_id=employee_id)
        else:
            attendances = Attendance.objects.all()

        serializer = AttendanceSerializer(attendances, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
     

    def post(self, request):
        serializer = AttendanceSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
    


@api_view(['DELETE'])
def delete_attandance( request, pk):
    attendance = get_object_or_404(Attendance, pk=pk)
    attendance.delete()
    return Response(
        {"message": "Attendance deleted successfully"},
            status=status.HTTP_204_NO_CONTENT
        )

@api_view(['GET'])
def attendance_summary_today(request):
    today = timezone.now().date()  # current date

    total_present = Attendance.objects.filter(date=today, status='Present').count()
    total_absent = Attendance.objects.filter(date=today, status='Absent').count()

    return Response({
        "date": str(today),
        "present": total_present,
        "absent": total_absent
    }, status=status.HTTP_200_OK)