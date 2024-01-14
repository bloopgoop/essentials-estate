from django.http import HttpResponse
from django.shortcuts import redirect
from django.contrib.auth.models import User
from django.conf import settings
import jwt

def allowed_users(allowed_roles=[]):
    def decorator(view_func):
        def wrapper_func(request, *args, **kwargs):

            if 'Authorization' not in request.headers:
                return HttpResponse("No Token", status=401)

            access_token = request.headers['Authorization']
            token_data = jwt.decode(access_token, settings.SECRET_KEY, algorithms=['HS256'])
            user = User.objects.get(id=token_data['user_id'])
            request.user = user

            user_groups = request.user.groups.all()

            if len(user_groups) == 0:
                return HttpResponse("No Groups", status=500)
            
            # Check if atleast 1 of user's group is allowed
            for group in user_groups:
                name = group.name
                if name in allowed_roles:
                    return view_func(request, *args, **kwargs)
                
            return HttpResponse("Wrong Group", status=403)
        
        return wrapper_func
    return decorator