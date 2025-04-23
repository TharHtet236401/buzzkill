from django.conf import settings

def currency_settings(request):
    return {
        'CURRENCY_SYMBOL': settings.CURRENCY_SYMBOL,
        'CURRENCY_CODE': settings.CURRENCY_CODE,
    } 