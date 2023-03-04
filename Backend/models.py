from django.db import models
from django.core.validators import RegexValidator


class User(models.Model):
  FirstName = models.CharField(max_length=100)
  LastName = models.CharField(max_length=100)
  Email = models.EmailField(primary_key=True) 
  PfP = models.URLField(max_length=250)
  PhoneRegex = RegexValidator(regex= r'0\s*(0|5|6|7)(\s*\d){8}\s*', message='PhoneNumber incorect') #vaider la phorme du numéro de tlphn
  PhoneNumber = models.CharField(validators=[PhoneRegex],max_length=20,blank=True)
  
  
  
class Announcement(models.Model):
  PubDate = models.DateTimeField()
  Title = models.CharField(max_length=200)
  Description = models.TextField()
  Price = models.PositiveBigIntegerField()
  Type = models.CharField(max_length=200)  # 
  Category = models.IntegerField() #vente:1 , echange:2 , location:3 , location vacance:4
  Wilaya = models.CharField(max_length=200)
  Commune = models.CharField(max_length=100) 
  Adress = models.CharField(max_length=255) # coordonée , latitude , longitude
  Owner = models.ForeignKey(User, on_delete=models.CASCADE) #référence vers l'utilisateur propriètaire

  


class Admin(models.Model):
  Me = models.ForeignKey(User, on_delete=models.CASCADE)
  
  
class Favourite(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  announcement = models.ForeignKey(Announcement, on_delete=models.CASCADE)
  
  
class Photo(models.Model):
  announcement = models.ForeignKey(Announcement, on_delete=models.CASCADE)
  image = models.ImageField(upload_to='images')
  
  
  
class Channel(models.Model):
  user1 = models.ForeignKey(User, on_delete=models.CASCADE, related_name= 'User1')
  user2 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='User2')
  
  
class Message(models.Model):
  sender = models.ForeignKey(User, on_delete=models.CASCADE)
  content= models.TextField()
  chanel = models.ForeignKey(Channel, on_delete=models.CASCADE)
  time = models.DateTimeField()