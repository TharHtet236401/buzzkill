from django.shortcuts import render
from .models import Transaction
# Create your views here.
def transactions(request):
    transactions = Transaction.objects.all()
    return render(request, 'transactions/transactions.html', {'transactions': transactions})

def budget(request):
    return render(request, 'transactions/budget.html')

def reports(request):
    return render(request, 'transactions/reports.html')

def settings(request):
    return render(request, 'transactions/settings.html')
