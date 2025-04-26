from django.shortcuts import render
from .models import Transaction
from django.core.paginator import Paginator
from datetime import datetime, timedelta
from django.db.models import Min, Max
from .form import TransactionForm

# Create your views here.
def transactions(request):
    try:
        # Get the date from query params or use today's date
        date_str = request.GET.get('date')
        if date_str:
            current_date = datetime.strptime(date_str, '%Y-%m-%d').date()
        else:
            # If no date provided, get the latest transaction date or today
            latest_date = Transaction.objects.aggregate(Max('date'))['date__max']
            current_date = latest_date if latest_date else datetime.now().date()

        # Get transactions for the selected date
        transactions = Transaction.objects.filter(date=current_date).order_by('-date', '-id')
        
        # Get the next and previous dates that have transactions
        next_date = Transaction.objects.filter(date__gt=current_date).order_by('date').values_list('date', flat=True).first()
        prev_date = Transaction.objects.filter(date__lt=current_date).order_by('-date').values_list('date', flat=True).first()
        print(next_date, prev_date)

        paginator = Paginator(transactions, 10)
        page_number = request.GET.get('page')
        page_obj = paginator.get_page(page_number)

        context = {
            'page_obj': page_obj,
            'current_date': current_date,
            'next_date': next_date,
            'prev_date': prev_date,
        }

        if request.headers.get('HX-Request'):
            return render(request, 'transactions/partials/transaction-table.html', context)
        return render(request, 'transactions/transactions.html', context)
    except Exception as e:
        # Handle any errors gracefully
        print(f"Error in transactions view: {str(e)}")
        return render(request, 'transactions/transactions.html', {'error': str(e)})

def add_transaction(request):
    if request.method == 'POST':
        form = TransactionForm(request.POST)
        if form.is_valid():
            form.save()
            return render(request, 'transactions/partials/transaction-table.html')
    else:
        form = TransactionForm()    
    return render(request, 'transactions/partials/add-transaction-form.html', {'form': form})

def budget(request):
    return render(request, 'transactions/budget.html')

def reports(request):
    return render(request, 'transactions/reports.html')

def settings(request):
    return render(request, 'transactions/settings.html')
