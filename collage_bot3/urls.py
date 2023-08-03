"""collage_bot3 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from questions import views as qu

urlpatterns = [
    path('admin/', admin.site.urls),
    path('chatbot/',qu.chatbot),
    path('get_answer/',qu.get_answer),
    path('add_question/',qu.addQuestion),
    path('check_question_status/',qu.check_question_status),
    # path('admin/questions/questions/add/',views.addQuestion),
]
