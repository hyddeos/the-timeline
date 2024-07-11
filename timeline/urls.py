from django.urls import path

from . import views


urlpatterns = [
    # API
    # Main Categories
    path('api/maincategories/', views.ListMainCategory.as_view()),
    path('api/maincategories/<int:pk>/', views.DetailMainCategory.as_view()),
    # Categorys
    path('api/categories/', views.ListCategory.as_view()),
    path('api/categories/<int:pk>/', views.DetailCategory.as_view()),
    path('api/filterdcategories/<int:pk>/', views.filter_categories),
    # Persons
    #path('api/persons/', views.ListPerson.as_view()),
    path('api/persons/<int:pk>/', views.DetailPerson.as_view()),
    # Random list, category.pk as varible
    path('api/random/', views.random_persons),
    path('api/random/<int:pk>', views.random_persons),
    # Challange-mode URL
    path('api/challenge/<str:pks>/', views.challenge_persons),  
    # Update Data
    path('api/data/<str:pk>/', views.data_update), 

]
