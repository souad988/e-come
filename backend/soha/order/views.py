from django.shortcuts import render
from django.conf import settings
import stripe 
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView

stripe.api_key='sk_test_51HQHhJFwMsEistgVxatD8OTfEiMUAKhlImXVvzWqdu8bXiWzWxgYXq0ALA6UwKOEqwSFYLzpFNvbSq6HJSADdZyn00rZHK0QUZ'
class StripeView(APIView):
    def POST(self,request):
        print('heeeeeeere iaaaaammmmm')
        intent=stripe.PaymentIntent.create(amount=1099,currency='usd',payment_method_types=['card'],)
        print('paymentIntent:::',intent)
        return JsonResponse(Intent)
@csrf_exempt
def  create_payment(request):
    print("from the create_payment::::::::",request.body)
    intent=stripe.PaymentIntent.create(amount=10900,currency='usd',payment_method_types=['card'],).client_secret
    print('paymentIntent:::',intent)

    return JsonResponse({"intent":intent})
    