from django.http import HttpResponse
from django.shortcuts import redirect
from django.contrib.auth.models import User

def allowed_users(allowed_roles=[]):
    def decorator(view_func):
        def wrapper_func(request, *args, **kwargs):
            data = request.POST
            user = User.objects.get(username=data['username'])
            user_groups = user.groups.all()

            if len(user_groups) == 0:
                return HttpResponse("No Groups")
            
            # Check if atleast 1 of user's group is allowed
            for group in user_groups:
                name = group.name
                if name in allowed_roles:
                    return view_func(request, *args, **kwargs)
                
            return HttpResponse("Wrong Group")
        
        return wrapper_func
    return decorator