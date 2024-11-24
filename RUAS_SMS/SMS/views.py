from django.shortcuts import render,HttpResponse
from django.db import connection
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.contrib.sessions.models import Session
from datetime import datetime, timedelta
from django.contrib.auth.decorators import login_required
import json

# Create your views here.
def login(request):
    return render(request,'login.html')

@require_http_methods(["POST"])
def verifyUser(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')
    with connection.cursor() as cursor:
        query = 'Select * from Authenticationdetails where username=%s'
        cursor.execute(query,(username,))
        rows = cursor.fetchall()
        print(rows)
    if rows and rows[0][1]==password:
        request.session['name']=username
        return JsonResponse({'message': 'Login Successful','position':rows[0][2]})
    return JsonResponse({"message":"Invalid Username or Password"})


def detail(request,position):
    if position=='Professor':
        return render(request,'professor.html')
    
    elif position=='Student':
        return render(request,'student.html')
    elif position=='Admin':
        return render(request,'admin.html')
        
def professorDetail(request):
    table1 = 'Professorbelongsto'
    table2 = 'Professorcourses'
    table3 = 'Department'
    table4 = 'Courses'
    with connection.cursor() as cursor:
        print(request.session.get('name'))
        query = f'SELECT * FROM {table1} as t1 INNER JOIN {table2} as t2 ON t1.professor_id = t2.professor_id INNER JOIN {table3} as t3 ON t1.Department_ID = t3.Department_ID INNER JOIN {table4} as t4 ON t2.course_id = t4.course_id where t1.professor_id=%s'
        cursor.execute(query,(request.session.get('name'),))
        rows = cursor.fetchall()
        columns = [col[0] for col in cursor.description]
    data = [dict(zip(columns,row))for row in rows]
    return JsonResponse({'message':data})

def getProfile(table1,request):
    with connection.cursor() as cursor:
        query = f'SELECT University_ID,First_Name,Last_Name,Phone_Number,Email,Semester,Year,Section FROM {table1} WHERE University_ID=%s'
        cursor.execute(query,(request.session.get('name'),))
        rows = cursor.fetchall()
        columns = [col[0] for col in cursor.description]
    data = [dict(zip(columns,row))for row in rows]
    return data

def getDepartment(table3,table1,request):
    with connection.cursor() as cursor:
        query = f'SELECT t1.Branch,t2.Department_ID,t2.Department_Name FROM {table1} as t1 INNER JOIN {table3} as t2 ON t1.Department_ID=t2.Department_ID where t1.University_ID=%s'
        cursor.execute(query,(request.session.get('name'),))
        rows = cursor.fetchall()
        columns = [col[0] for col in cursor.description]
    data = [dict(zip(columns,row))for row in rows]
    return data

def getcourseData(table2,table8,request):
    with connection.cursor() as cursor:
        query = f'SELECT t1.Course_ID,t2.Course_Name FROM {table2} as t1 INNER JOIN {table8} as t2 ON t1.Course_ID=t2.Course_ID WHERE t1.University_ID=%s'
        cursor.execute(query,(request.session.get('name'),))
        rows = cursor.fetchall()
        columns = [col[0] for col in cursor.description]
    data = [dict(zip(columns,row))for row in rows]
    return data

def getExamData(table2,table6,table8,request):
    with connection.cursor() as cursor:
        query = f'SELECT t1.Course_ID, t1.Course_Name, t3.Marks FROM {table8} as t1 INNER JOIN {table2} as t2 ON t1.Course_ID=t2.Course_ID INNER JOIN {table6} as t3 ON t1.Course_ID=t3.Course_ID WHERE t2.University_ID=%s'
        cursor.execute(query,(request.session.get('name'),))
        rows = cursor.fetchall()
        columns = [col[0] for col in cursor.description]
    data = [dict(zip(columns,row))for row in rows]
    return data

def getFeeData(table2,table7,request):
    with connection.cursor() as cursor:
        query = f'SELECT t2.Amount,t2.Payment_Status FROM {table2} as t1 INNER JOIN {table7} as t2 ON t1.University_ID=t2.University_ID WHERE t1.University_ID=%s'
        cursor.execute(query,(request.session.get('name'),))
        rows = cursor.fetchall()
        columns = [col[0] for col in cursor.description]
    data = [dict(zip(columns,row))for row in rows]
    return data

def studentDetail(request):
    table1 = 'Studentbelongsto'
    table2 = 'Studentcourses'
    table3 = 'Department'
    table4 = 'Professorcourses'
    table5 = 'Professorbelongsto'
    table6 = 'Examresultsbelongsto'
    table7 = 'Feepaymentmadeby'
    table8 = 'Courses'
    profileData= getProfile(table1,request)
    departmentData = getDepartment(table3,table1,request)
    courseData = getcourseData(table2,table8,request)
    examData = getExamData(table2,table6,table8,request)
    feeData = getFeeData(table2,table7,request)
    return JsonResponse({'profile':profileData,'department':departmentData,'course':courseData,'exam':examData,'fee':feeData})

def getAllStudentDetail(table1,table3):
    with connection.cursor() as cursor:
        query = f'SELECT t1.University_ID,t1.First_Name,t1.Last_Name,t1.Phone_Number,t1.Email,t1.Semester,t1.Year,t1.Section,t1.Branch,t2.Department_ID,t2.Department_Name FROM {table1} as t1 INNER JOIN {table3} as t2 ON t1.Department_ID=t2.Department_ID'
        cursor.execute(query)
        rows = cursor.fetchall()
        columns = [col[0] for col in cursor.description]
    data = [dict(zip(columns,row))for row in rows]
    return data

def adminDetail(request):
    table1 = 'Studentbelongsto'
    table2 = 'Studentcourses'
    table3 = 'Department'
    table4 = 'Professorcourses'
    table5 = 'Professorbelongsto'
    table6 = 'Courses'
    table7 = 'Examresultsbelongsto'
    table8 = 'Feepaymentmadeby'
    allStudentData = getAllStudentDetail(table1,table3)
    return JsonResponse({'allStudentData':allStudentData})

@require_http_methods(["POST"])
def getStudentDetail(request):
    data = json.loads(request.body.decode('utf-8'))
    UID = data.get('universityID')
    table1 = 'Studentbelongsto'
    table2 = 'Studentcourses'
    table3 = 'Department'
    table6 = 'Courses'
    table7 = 'Examresultsbelongsto'
    table8 = 'Feepaymentmadeby'
    with connection.cursor() as cursor:
        query = f""""SELECT t1.University_ID,t1.First_Name,t1.Last_Name,t1.Phone_Number,t1.Email,t1.Semester,t1.Year,t1.Section,t1.Branch,t2.Department_ID,t2.Department_Name,t3.Course_ID,t4.Course_Name,t5.Marks,t6.Amount,t6.Payment_Status 
        FROM {table1} as t1 INNER JOIN {table3} as t2 ON t1.Department_ID=t2.Department_ID INNER JOIN {table2} as t3 ON t1.University_ID=t3.University_ID INNER JOIN {table6} as t4 ON t3.Course_ID=t4.Course_ID INNER JOIN {table7} as t5 ON t1.University_ID=t5.University_ID INNER JOIN {table8} as t6 ON t1.University_ID=t6.University_ID WHERE t1.University_ID=%s"""
        cursor.execute(query,(UID,))
        rows = cursor.fetchall()
        columns = [col[0] for col in cursor.description]
    data = [dict(zip(columns,row))for row in rows]
    return JsonResponse({'Studentdata':data})

def update(*tables):
    length = len(tables)
    if length==3:
        uid=tables[0]
        data=tables[1]
        table=tables[2]
    else:
        uid=tables[0]
        data=tables[1]
        table=tables[2]
        verify=tables[3]
        with connection.cursor() as cursor:
            for key,value in data.items():
                query = f'SELECT * FROM {verify} WHERE {key}=%s'
                cursor.execute(query,(value,))
                rows = cursor.fetchall()
                if not rows:
                    return 0
    with connection.cursor() as cursor:
        for key,value in data.items():
            query = f'UPDATE {table} SET {key}=%s WHERE University_ID=%s'
            if table=='Examresultsbelongsto':
                cursor.execute(query,(int(value),uid))
            else:
                cursor.execute(query,(value,uid))
            rows = cursor.fetchall()
            connection.commit()
    return


def updateStudent(request):
    data = json.loads(request.body)
    uid = data.get('uid')
    marks = data.get('marks')
    for mark in marks:
        update(uid,{'Marks':mark['Marks']},'Examresultsbelongsto')
    profile = data.get('profile')
    update(uid,profile,'Studentbelongsto')
    dept = data.get('dept')
    flag = update(uid,{'Department_ID':dept['Department_ID']},'Studentbelongsto','department')
    if flag==0:
        return JsonResponse({'message':'No such value for Department ID'})
    fee = data.get('fee')
    update(uid,fee,'feepaymentmadeby')

    return JsonResponse({'message':'Updated SUccessfully'})

def deleteStudentTuple(request):
    data = json.loads(request.body)
    uid = data.get('universityID')
    tables = ['studentbelongsto','studentcourses','authenticationdetails','feepaymentmadeby','examresultsbelongsto']
    for table in tables:
        if table=='authenticationdetails':
            with connection.cursor() as cursor:
                query = f'DELETE FROM {table} as t1 WHERE t1.Username=%s'
                cursor.execute(query,(uid,))
                if cursor.rowcount==0:
                    return JsonResponse({'message':f'Issue in deleting {table}'})
        else:
            with connection.cursor() as cursor:
                query = f'DELETE FROM {table} as t1 WHERE t1.university_id=%s'
                cursor.execute(query,(uid,))
                rows = cursor.fetchall()
                if cursor.rowcount==0:
                    return JsonResponse({'message':f'Issue in deleting {table}'})
    return JsonResponse({'message':'Deleted Successfully'})

def insertStudentTuple(request):
    data = json.loads(request.body)
    data = data.get('data')
    values = []
    for key,value in data.items():
        values.append(value)
    values = tuple(values)
    with connection.cursor() as cursor:
        query = f'INSERT INTO studentbelongsto VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)'
        cursor.execute(query,values)
    connection.commit()
    with connection.cursor() as cursor:
        query = f'SELECT * FROM studentbelongsto'
        cursor.execute(query)
        rows = cursor.fetchall()
    return JsonResponse({'message':'Inserted Successfully'})