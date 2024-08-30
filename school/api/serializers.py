from rest_framework import serializers
from .models import Class, Teacher, Student, Homework, HomeworkSubmission, User

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']

class StudentSerializer(serializers.ModelSerializer):
    user = UserSerializer()  # Nested UserSerializer to include username

    class Meta:
        model = Student
        fields = ['user']

class ClassSerializer(serializers.ModelSerializer):
    teacher = TeacherSerializer()
    students = StudentSerializer(many=True)

    class Meta:
        model = Class
        fields = '__all__'

class HomeworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Homework
        fields = '__all__'


class HomeworkSubmissionSerializer(serializers.ModelSerializer):
    student = StudentSerializer()

    class Meta:
        model = HomeworkSubmission
        fields = ['id', 'homework', 'student', 'content', 'submitted_at']