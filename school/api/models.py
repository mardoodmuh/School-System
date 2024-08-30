from django.contrib.auth.models import User
from django.db import models

class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.user.username

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.user.username

class Class(models.Model):
    name = models.CharField(max_length=100)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    students = models.ManyToManyField(Student, related_name='classes')
    
    def __str__(self):
        return self.name

class Homework(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    assigned_class = models.ForeignKey(Class, on_delete=models.CASCADE)
    created_by = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    due_date = models.DateTimeField()
    
    def __str__(self):
        return self.title

class HomeworkSubmission(models.Model):
    homework = models.ForeignKey(Homework, related_name='submissions', on_delete=models.CASCADE)
    student = models.ForeignKey(Student, related_name='submissions', on_delete=models.CASCADE)
    content = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.homework.title