from django.urls import path
from . import views

urlpatterns = [
    path('', views.transactions, name='transactions'),
    path('budget/', views.budget, name='budget'),
    path('reports/', views.reports, name='reports'),
    path('settings/', views.settings, name='settings'),
    path('add-transaction/', views.add_transaction, name='add_transaction'),
]

