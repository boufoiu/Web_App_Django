import json
import re
from .models import User, Announcement, Favourite, Photo, Admin
from .serializers import UserSerializer, AnnouncementSerializer
from django.http import HttpResponseRedirect, HttpResponse
import requests
from django.shortcuts import get_list_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
import base64
from django.shortcuts import render
from django.template import RequestContext



def session(request):
    return HttpResponse(request.session.get('email'))


@api_view(['GET'])
def UsersViewSet(request):
    queryset = User.objects.all()
    serializer = UserSerializer(queryset, many= True)
    return Response(serializer.data)

@api_view(['GET'])
def AnnouncementsViewSet(request):
    queryset = Announcement.objects.all()
    serializer = AnnouncementSerializer(queryset, many= True)
    return Response(serializer.data)
    


def google_login(request):
    token_request_uri = "https://accounts.google.com/o/oauth2/auth"
    response_type = "code"
    client_id="236907624264-127kevoilqdrh8v482rdbv85n4tm49mv.apps.googleusercontent.com"
    redirect_uri = "http://127.0.0.1:8000/login/auth/"
    scope = "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email"
    url = "{token_request_uri}?response_type={response_type}&client_id={client_id}&redirect_uri={redirect_uri}&scope={scope}&prompt=select_account".format(
        token_request_uri = token_request_uri,
        response_type = response_type,
        client_id = client_id,
        redirect_uri = redirect_uri,
        scope = scope)
    return HttpResponseRedirect(url)



def google_authenticate(request):
    
    login_failed_url = '/'
    if 'error' in request.GET or 'code' not in request.GET:
        return HttpResponseRedirect('{loginfailed}'.format(loginfailed = login_failed_url))

    access_token_uri = 'https://accounts.google.com/o/oauth2/token'
    redirect_uri = "http://127.0.0.1:8000/login/auth/"
    data = "code={code}&redirect_uri={redirect_uri}&client_id={client_id}&client_secret={client_secret}&grant_type=authorization_code".format(
        code=request.GET['code'],
        redirect_uri=redirect_uri,
        client_id="236907624264-127kevoilqdrh8v482rdbv85n4tm49mv.apps.googleusercontent.com",
        client_secret="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",
    )
    headers={'content-type':'application/x-www-form-urlencoded'}
    r1 = requests.post(access_token_uri, data = data, headers = headers)
    access_token = r1.json()['access_token']
    r2 = requests.get("https://www.googleapis.com/oauth2/v1/userinfo?access_token={accessToken}".format(accessToken=access_token))
    l = r2.json()
    user = None
    try:
        user = User.objects.get(Email = l['email'] )
        #print('utilisateur existant')
        
    except User.DoesNotExist:
        print(l)
        user = User(FirstName = l['family_name'],LastName=l['given_name'],PfP=l['picture'],Email=l['email'])
        user.save()
    
    if request.session.get('email'):
        request.session.flush()
        
    request.session['email'] =l['email'] 
    
    return HttpResponseRedirect('/admin/')


@api_view(['POST'])
def update_phone_number(request):
    print(request.data)
    phone = request.data.get('phone')
    if 'email' in request.session:
        try:
            pattern = re.compile(r'0\s*(5|6|7)(\s*\d){8}\s*')
            if pattern.match(phone):
                user = User.objects.get(pk=request.session.get('email'))
                user.PhoneNumber = phone
                user.save()
                serializer = UserSerializer(user)
                return Response(serializer.data)
            return Response({ 'error': 'Invalid phone number' }, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    return Response(status=status.HTTP_401_UNAUTHORIZED)
    
def logout(request):
    request.session.flush()
    return HttpResponseRedirect('/login/')
    
    
@api_view(['GET', 'DELETE']) # Add modifier une annonce
def announcement_detail(request, pk):
    
    try:
        announcement = Announcement.objects.get(pk = pk)
    except Announcement.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)
    if request.method=='GET':
        serializer = AnnouncementSerializer(announcement)
        return Response({ 'data': serializer.data, 'images': get_photos(pk)})
    elif request.method=='DELETE':
        if 'email' in request.session:
            serializer = AnnouncementSerializer(announcement)
            if announcement.Owner_id == request.session['email']:
                announcement.delete()
                return Response(status = status.HTTP_204_NO_CONTENT)
            return Response(status= status.HTTP_401_UNAUTHORIZED)
           


@api_view(['GET', 'POST'])
def announcements(request):
    print('foo')
    try:
        announcements = Announcement.objects.all().order_by('-PubDate')
    except Announcement.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)
    if request.method=='GET':
        if 'Type' in request.GET:
            announcements = announcements.filter(Type= request.GET.get('Type', ''))
        if 'Wilaya' in request.GET:
            announcements = Announcement.objects.filter(Wilaya= request.GET.get('Wilaya', ''))
        if 'Commune' in request.GET:
            announcements = Announcement.objects.filter(Commune= request.GET.get('Commune', ''))
        if 'Date_gte' in request.GET:
            announcements = announcements.filter(PubDate__gte= request.GET.get('Date_gte', ''))
        if 'Date_lte' in request.GET:
            announcements = announcements.filter(PubDate__lte= request.GET.get('Date_lte', ''))
        if 'Recherche' in request.GET:
            print("jvoijkmokspokpkpkpok")
            print(request.GET.get('Recherche',''))
            announcements = search(request.GET.get('Recherche',''),announcements)
        
        images = []
        
        for announcement in announcements:
            images.append({ 'id': announcement.id, 'images': get_photos(announcement.id) })
        
        serializer = AnnouncementSerializer(announcements, many= True)
        return Response({ 'data': serializer.data, 'images': images})
    elif request.method=='POST':
        try:
            data = json.loads(request.data.get('data'))
        except json.JSONDecodeError:
            return Response({ 'error': 'invalid json'}, status = status.HTTP_400_BAD_REQUEST)
        serializer = AnnouncementSerializer(data= data)
        print(serializer)
        if serializer.is_valid():
            if 'email' in request.session:
                if len(request.FILES.getlist('image')) > 0:
                    serializer.validated_data['Owner_id'] = request.session['email']
                    serializer.save()
                    add_photos(request, serializer)
                    return Response(serializer.data, status = status.HTTP_201_CREATED)
                return Response(status = status.HTTP_400_BAD_REQUEST)
            return Response(status = status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
  
  
@api_view(['GET'])
def my_announcements(request):
    try:
        announcements = Announcement.objects.filter(Owner_id= request.session['email'])
    except Announcement.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)
    serializer = AnnouncementSerializer(announcements, many= True)
    return Response(serializer.data)
    
  

@api_view(['POST'])
def post_favourite(request, pk):
    print('foo')
    try:
        announcement = Announcement.objects.get(pk = pk)        
    except Announcement.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)
    if 'email' in request.session:
        try:
            Favourite.objects.get(user = User.objects.get(pk = request.session['email']),announcement= announcement )
        except Favourite.DoesNotExist:
            favorite = Favourite(user = User.objects.get(pk = request.session['email']), announcement= announcement)
            favorite.save()
        return HttpResponseRedirect('/api/favourite/')
    return Response(status = status.HTTP_401_UNAUTHORIZED)
     
    
@api_view(['GET'])
def my_favourite(request):
    try:
        favourites = get_list_or_404(Favourite, user = request.session['email'])
    except Favourite.DoesNotExist:
        favourites=[]        
    announcements = []
    for f in favourites:
        announcements.append(Announcement.objects.get(pk = f.announcement.pk))
    #FavouriteViewSet.queryset = announcements
    serializer = AnnouncementSerializer(announcements, many=True)
    return Response(serializer.data)

    
def add_photos(request, serializer):
    announcement = Announcement.objects.get(pk=serializer.data.get('id'))
    for image in request.FILES.getlist('image'):
        photo = Photo(announcement= announcement, image= image)
        photo.save()
    

def get_photos(pk):
    images = Photo.objects.filter(announcement_id= pk)
    path_images =[]
    for image in images:
        with open(image.image.path, "rb") as image_file:
            image_data = base64.b64encode(image_file.read()).decode('utf-8')
        #path_images.append('<img src="data:image/png;base64, {image_data}"/>'.format(image_data=image_data))
        path_images.append(image_data)
    return path_images




def search(text,announcements):
    l = list( text.lower().split(" "))
    while "" in l : l.remove("")
    result = []
    taille = len(l)
    print(l)
    #print(taille)
    for announcement in announcements:
        exist = False
        Title = announcement.Title.lower().split(" ")
        Description = announcement.Description.lower().split(" ")
        i = 0
        while i< taille and not exist :
            mot = l[i]
            if mot in Title or mot in Description:
                exist = True
                result.append(announcement)
            #print(i)
            i+=1         
    return result
    
    
def chat_box(request, chat_box_name):
    # we will get the chatbox name from the url
    return render(request, "chatbox.html", {"chat_box_name": chat_box_name})


@api_view(['GET'])
def add_admin(request,pk):
    try:
        Admin.objects.get(Me = User.objects.get(pk = request.session['email']))
    except Admin.DoesNotExist:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    try:
        Admin.objects.get(Me = User.objects.get(pk = pk))
    except Admin.DoesNotExist:
        admin = Admin( Me= User.objects.get(pk= pk))
        admin.save()
    return HttpResponseRedirect('/api/users/')