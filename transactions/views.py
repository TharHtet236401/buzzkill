from django.shortcuts import render

# Create your views here.
def transactions(request):
    return render(request, 'transactions/transactions.html')

def budget(request):
    return render(request, 'transactions/budget.html')

def reports(request):
    return render(request, 'transactions/reports.html')

def settings(request):
    return render(request, 'transactions/settings.html')
