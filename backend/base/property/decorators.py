from django.http import HttpResponse
from django.shortcuts import redirect
from django.contrib.auth.models import User

def allowed_users(allowed_roles=[]):
    def decorator(view_func):
        def wrapper_func(request, *args, **kwargs):
            data = request.POST
            user = User.objects.get(username=data['username'])
            user_group = user.groups.all()[0].name
            if user_group in allowed_roles:
                return view_func(request, *args, **kwargs)
            else:
                return HttpResponse("Wrong Group")
        return wrapper_func
    return decorator