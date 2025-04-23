from django.shortcuts import render
from .models import Transaction
from django.core.paginator import Paginator
# Create your views here.
def transactions(request):
    if request.headers.get('HX-Request'):
        transactions = Transaction.objects.all()
        paginator = Paginator(transactions, 10)
        page_number = request.GET.get('page')
        page_obj = paginator.get_page(page_number)
        return render(request, 'transactions/partials/transaction-table.html', {'page_obj': page_obj})
    transactions = Transaction.objects.all()
    paginator = Paginator(transactions, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    return render(request, 'transactions/transactions.html', {'page_obj': page_obj})

def budget(request):
    return render(request, 'transactions/budget.html')

def reports(request):
    return render(request, 'transactions/reports.html')

def settings(request):
    return render(request, 'transactions/settings.html')
