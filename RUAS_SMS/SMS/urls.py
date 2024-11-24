from django.urls import path
from .views import *

urlpatterns = [
    path('',login,name='login'),
    path('verifyUser',verifyUser,name='verifyUser'),
    path('detail/<str:position>',detail,name='detail'),
    path('professorDetail',professorDetail,name="professorDetail"),
    path('studentDetail',studentDetail,name="studentDetail"),
    path('adminDetail',adminDetail,name="adminDetail"),
    path('getStudentDetail',getStudentDetail,name="getStudentDetail"),
    path('updateStudent',updateStudent,name="updateStudent"),
    path('deleteStudentTuple',deleteStudentTuple,name="deleteStudentTuple"),
    path('insertStudentTuple',insertStudentTuple,name="insertStudentTuple"),
]