from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ClassViewSet, HomeworkViewSet, HomeworkSubmissionViewSet, submit_homework, get_homework_submissions
from .auth_views import CustomAuthToken, logout

router = DefaultRouter()
router.register(r'classes', ClassViewSet)
router.register(r'homeworks', HomeworkViewSet)
router.register(r'submissions', HomeworkSubmissionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/login/', CustomAuthToken.as_view(), name='api_login'),
    path('auth/logout/', logout, name='api_logout'),
    path('homeworks/<int:homework_id>/submit/', submit_homework, name='submit_homework'),
    path('homeworks/<int:homework_id>/submissions/', get_homework_submissions, name='get_homework_submissions'),
]