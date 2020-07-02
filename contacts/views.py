from django.shortcuts import render
from rest_framework import permissions
from rest_framework.views import APIView
from .models import Contact
from django.core.mail import send_mail
from rest_framework.response import Response

class ContactCreateView(APIView):
    permission_classes = (permissions.AllowAny,)
    
    def post(self, request, format=None):
        data = self.request.data 
        
        try:
            send_mail(
                subject=data["subject"],
                message=f'Name: {data["name"]} \n Email: {data["email"]} \n\n Message: \n {data["message"]}',
                from_email="chiragsaini7777@gmail.com",
                recipient_list=["chiragsaini7777@gmail.com"],
                fail_silently=False
            )
            contact = Contact(name=data["name"], email=data["email"], subject=data["subject"], message=data["message"])
            contact.save()
            
            return Response({"success": "Message Sent Successfully"})
        except Exception as e:
            return Response({"error": "Message failed to sent"})