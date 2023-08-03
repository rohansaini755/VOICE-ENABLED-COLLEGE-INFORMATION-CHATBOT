from django.db import models

# Create your models here.
class Questions(models.Model):
    id = models.AutoField(primary_key=True)
    question = models.CharField(max_length=1000,null=False)
    answer = models.CharField(max_length=1000,blank=True,null=True)
    status = models.BooleanField(default=True)
    question_entered = models.DateField(null=True,blank=True)
    updated_date = models.DateField(null=True,blank=True)
    updated_by = models.CharField(max_length=50,blank=True,null=True)
    name = models.CharField(max_length=100,blank=True,null=True)
    tag = models.CharField(max_length=50,blank=True,null=True)
    

    class Meta:
        db_table='question_table'

    def __str__(self):
        return self.name
