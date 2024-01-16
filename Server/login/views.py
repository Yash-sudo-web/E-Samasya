from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserViewSerializer
from .models import DFUser
import random
import os
import requests

# Create your views here.
def create_otp():
    return random.randint(1000, 9999)


def sms_send(a, msg):
    SMS_API_KEY = os.environ.get('SMS_API_KEY')
    url = f"https://2factor.in/API/V1/{SMS_API_KEY}/SMS/{a[0]}/{int(msg)}/OTPTEMPLATE1"

    print(url)
    response = requests.request("GET", url)

    print(response.text)

@api_view(['POST'])
def user_signin(request):
    if request.method == 'POST':
        data = request.data
        otp = create_otp()
        data["otp"] = otp
        print(data['phone'])
        serializer = UserViewSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            sms_send([int(data["phone"])], str(otp))
            obj = DFUser.objects.get_by_natural_key(data["phone"])
            res = getattr(obj, "id")
            return Response({'msg': 'data created', 'userid': res})
        else:
            obj = DFUser.objects.get_by_natural_key(data["phone"])
            obj.otp = otp
            obj.save()
            sms_send([int(data["phone"])], str(otp))
            res = getattr(obj, "id")
            return Response({'msg': 'data created', 'userid': res})