from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Employee
from .serializer import EmployeeSerializer


# Create your views here.


class EmployeesView(APIView):

    def get(self, request):
        print("Api called")
        employees = Employee.objects.all().order_by('-created_at')
        serializer = EmployeeSerializer(employees, many=True)
        print("Api success")
        return Response(serializer.data, status=status.HTTP_200_OK)


    def post(self, request):
        serializer = EmployeeSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Employee created successfully !!!","data": serializer.data},status=status.HTTP_201_CREATED)

        return Response({"error": serializer.errors},status=status.HTTP_400_BAD_REQUEST)



class EmployeeDeleteView(APIView):

    def delete(self, request, pk):
        employee = get_object_or_404(Employee, pk=pk)
        employee.delete()

        return Response({"message": "Employee deleted successfully"},status=status.HTTP_204_NO_CONTENT)

