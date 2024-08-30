from django.contrib import admin
from .models import Teacher, Student, Class, Homework, HomeworkSubmission

admin.site.register(Teacher)
admin.site.register(Student)
admin.site.register(Class)
admin.site.register(Homework)
admin.site.register(HomeworkSubmission)