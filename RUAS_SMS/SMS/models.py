# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class Authenticationdetails(models.Model):
    username = models.CharField(db_column='Username', primary_key=True, max_length=30)  # Field name made lowercase.
    password = models.CharField(db_column='Password', max_length=30)  # Field name made lowercase.
    status = models.CharField(db_column='Status', max_length=30)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'authenticationdetails'


class Courses(models.Model):
    course_id = models.CharField(db_column='Course_ID', primary_key=True, max_length=10)  # Field name made lowercase.
    course_name = models.CharField(db_column='Course_Name', max_length=50)  # Field name made lowercase.
    department_id = models.CharField(db_column='Department_ID', max_length=10)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'courses'


class Department(models.Model):
    department_id = models.CharField(db_column='Department_ID', primary_key=True, max_length=10)  # Field name made lowercase.
    department_name = models.CharField(db_column='Department_Name', max_length=30)  # Field name made lowercase.
    hod_id = models.CharField(db_column='HOD_ID', max_length=50)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'department'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Examresultsbelongsto(models.Model):
    university_id = models.CharField(db_column='University_ID', primary_key=True, max_length=20)  # Field name made lowercase. The composite primary key (University_ID, Course_ID) found, that is not supported. The first column is selected.
    course_id = models.CharField(db_column='Course_ID', max_length=10)  # Field name made lowercase.
    marks = models.IntegerField(db_column='Marks', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'examresultsbelongsto'
        unique_together = (('university_id', 'course_id'),)


class Feepaymentmadeby(models.Model):
    university_id = models.CharField(db_column='University_ID', primary_key=True, max_length=20)  # Field name made lowercase.
    amount = models.CharField(db_column='Amount', max_length=30)  # Field name made lowercase.
    payment_status = models.CharField(db_column='Payment_Status', max_length=10)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'feepaymentmadeby'


class Professorbelongsto(models.Model):
    professor_id = models.CharField(db_column='Professor_ID', primary_key=True, max_length=20)  # Field name made lowercase.
    first_name = models.CharField(db_column='First_Name', max_length=10)  # Field name made lowercase.
    last_name = models.CharField(db_column='Last_Name', max_length=30)  # Field name made lowercase.
    phone_number = models.CharField(db_column='Phone_Number', max_length=20)  # Field name made lowercase.
    email = models.CharField(db_column='Email', max_length=50)  # Field name made lowercase.
    department_id = models.CharField(db_column='Department_ID', max_length=10)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'professorbelongsto'


class Professorcourses(models.Model):
    professor_id = models.CharField(db_column='Professor_ID', primary_key=True, max_length=20)  # Field name made lowercase. The composite primary key (Professor_ID, Course_ID) found, that is not supported. The first column is selected.
    course_id = models.CharField(db_column='Course_ID', max_length=10)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'professorcourses'
        unique_together = (('professor_id', 'course_id'),)


class Studentbelongsto(models.Model):
    university_id = models.CharField(db_column='University_ID', primary_key=True, max_length=20)  # Field name made lowercase.
    first_name = models.CharField(db_column='First_Name', max_length=10)  # Field name made lowercase.
    last_name = models.CharField(db_column='Last_Name', max_length=30)  # Field name made lowercase.
    phone_number = models.CharField(db_column='Phone_Number', max_length=20)  # Field name made lowercase.
    email = models.CharField(db_column='Email', max_length=50)  # Field name made lowercase.
    semester = models.IntegerField()
    year = models.IntegerField(db_column='Year')  # Field name made lowercase.
    section = models.CharField(db_column='Section', max_length=3)  # Field name made lowercase.
    branch = models.CharField(db_column='Branch', max_length=50)  # Field name made lowercase.
    department_id = models.CharField(db_column='Department_ID', max_length=10)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'studentbelongsto'


class Studentcourses(models.Model):
    university_id = models.CharField(db_column='University_ID', primary_key=True, max_length=20)  # Field name made lowercase. The composite primary key (University_ID, Course_ID) found, that is not supported. The first column is selected.
    course_id = models.CharField(db_column='Course_ID', max_length=10)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'studentcourses'
        unique_together = (('university_id', 'course_id'),)
