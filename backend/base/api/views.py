import json
from django.http import JsonResponse

from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string
from .tokens import account_activation_token
from django.core.mail import EmailMessage
from django.contrib import messages

from rest_framework.response import Response
from rest_framework.decorators import api_view

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.models import Group

from django.shortcuts import render

# Customizing token response
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def addPayment(request):
    return JsonResponse('Payment was added!', safe=False)


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
    ]

    return Response(routes)

@api_view(['POST'])
def register(request):

    if request.method == "POST":
        data = json.loads(request.body)

        user = User.objects.create(
            first_name=data['first_name'],
            last_name=data['last_name'],
            username=data['username'],
            email=data['email'],
            password=make_password(data['password']),
        )

    try:
        user.is_active = False
        user.save()

        # add user to the common group
        common_group, created = Group.objects.get_or_create(name="common_user")
        user.groups.add(common_group)

        activateEmail(request, data)
        return Response('Click the link in your email to activate the account', status=201)
    except Exception as e:
        user.delete()
        return Response(f'Error registering user! {e}', status=500)

@api_view(['GET'])
def activate(request, uidb64, token):
    User = get_user_model()
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except:
        user = None

    try:
        if user is not None and account_activation_token.check_token(user, token):
            user.is_active = True
            user.save()

            messages.success(request, "Thank you for your email confirmation. Now you can login your account.")
            return render(request, 'verify_email_complete.html')
        else:
            messages.error(request, "Activation link is invalid!")
            return render(request, "verify_email_error.html", {
                'error': 'Email already verified or link is invalid!'
            })

    except Exception as e:
        return render(request, "verify_email_error.html", {
            'error': e
        })

def activateEmail(request, data):
    user = User.objects.get(username=data['username'])
    mail_subject = "Activate your user account."
    message = render_to_string("template_activate_account.html", {
        'user': data['username'],
        'domain': get_current_site(request).domain,
        'uid': urlsafe_base64_encode(force_bytes(user.pk)),
        'token': account_activation_token.make_token(user),
        "protocol": 'https' if request.is_secure() else 'http'
    })
    email = EmailMessage(mail_subject, message, to=[data['email']])
    if email.send():
        messages.success(request, f'Dear <b>{user}</b>, please go to you email <b>{data['email']}</b> inbox and click on \
                received activation link to confirm and complete the registration. <b>Note:</b> Check your spam folder.')
    else:
        messages.error(request, f'Problem sending email to {data['email']}, check if you typed it correctly.')