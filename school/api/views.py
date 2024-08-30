from rest_framework import viewsets, permissions
from .models import Class, Teacher, Student, Homework, HomeworkSubmission
from .serializers import ClassSerializer, TeacherSerializer, StudentSerializer, HomeworkSerializer, HomeworkSubmissionSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
import status

class IsTeacher(permissions.BasePermission):
    def has_permission(self, request, view):
        return hasattr(request.user, 'teacher')

class IsStudent(permissions.BasePermission):
    def has_permission(self, request, view):
        return hasattr(request.user, 'student')

class ClassViewSet(viewsets.ModelViewSet):
    queryset = Class.objects.all()
    serializer_class = ClassSerializer
    permission_classes = [permissions.IsAuthenticated]

class HomeworkViewSet(viewsets.ModelViewSet):
    queryset = Homework.objects.all()
    serializer_class = HomeworkSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            self.permission_classes = [permissions.IsAuthenticated, IsTeacher, IsAdminUser]
        else:
            self.permission_classes = [permissions.IsAuthenticated]
        return super().get_permissions()

class HomeworkSubmissionViewSet(viewsets.ModelViewSet):
    queryset = HomeworkSubmission.objects.all()
    serializer_class = HomeworkSubmissionSerializer

    def get_permissions(self):
        if self.action in ['create']:
            self.permission_classes = [permissions.IsAuthenticated, IsStudent]
        else:
            self.permission_classes = [permissions.IsAuthenticated]
        return super().get_permissions()

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_homework(request, homework_id):
    try:
        homework = Homework.objects.get(id=homework_id)
        student = Student.objects.get(user=request.user)
        submission = HomeworkSubmission(
            homework=homework,
            student=student,
            submission_text=request.data['content']
        )
        submission.save()
        return Response({'status': 'submission successful'}, status=status.HTTP_201_CREATED)
    except Homework.DoesNotExist:
        return Response({'error': 'Homework not found'}, status=status.HTTP_404_NOT_FOUND)
    except Student.DoesNotExist:
        return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

import logging

logger = logging.getLogger(__name__)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_homework_submissions(request, homework_id):
    try:
        logger.info(f"User {request.user} accessing submissions for homework {homework_id}")
        if not request.user.is_authenticated:
            logger.warning("User is not authenticated")
            return Response({'error': 'Not authenticated'}, status=status.HTTP_403_FORBIDDEN)

        submissions = HomeworkSubmission.objects.filter(homework_id=homework_id)
        serializer = HomeworkSubmissionSerializer(submissions, many=True)
        return Response(serializer.data)
    except Exception as e:
        logger.error(f"Error fetching submissions: {str(e)}")
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
