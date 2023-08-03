from django.shortcuts import render
from rest_framework.decorators import api_view 
import json
from rest_framework.response import Response
from rest_framework import status
from questions.models import Questions
from questions.serializer import Questions_serializer
# Create your views here.


@api_view(['POST'])
def check_question_status(request):
    id = request.data['id']
    question = Questions.objects.filter(id = id).first()
    # print(question)
    return Response({"question":question.question},status=status.HTTP_200_OK)


@api_view(['POST'])
def addQuestion(request):
    print(request.data)
    serializer = Questions_serializer(data = request.data)
    
    if serializer.is_valid():
        serializer.save()
        return Response({"message":"done"},status=status.HTTP_200_OK)
    
    return Response({"message":"some error"},status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def chatbot(request):
    # print("enter")
    return render(request,'index.html')

@api_view(['POST'])
def get_answer(request):
    data = {}
    question = request.data['question']
    ques = Questions.objects.filter(question = question).first()
    if ques == None:
        data['answer'] = "This question is not in our database"
        data = json.dumps(data)
        return Response(data,status=status.HTTP_200_OK)
    data['answer'] = ques.answer
    data = json.dumps(data)
    return Response(data,status=status.HTTP_200_OK)



