# Generated by Django 4.1.3 on 2023-02-25 16:42

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Questions',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('question', models.CharField(max_length=1000)),
                ('answer', models.CharField(blank=True, max_length=1000, null=True)),
                ('status', models.BooleanField(default=True)),
                ('question_entered', models.DateField(blank=True, null=True)),
                ('updated_date', models.DateField(blank=True, null=True)),
                ('updated_by', models.CharField(blank=True, max_length=50, null=True)),
                ('name', models.CharField(blank=True, max_length=100, null=True)),
                ('tag', models.CharField(blank=True, max_length=50, null=True)),
            ],
            options={
                'db_table': 'question_table',
            },
        ),
    ]
