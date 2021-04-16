# from rest_framework import generics
from users.models import CustomUser
from users.api.serializers import CustomUserSerializer
# from django.shortcuts import render
from rest_framework.generics import ListAPIView


class CustomUserListView(ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer


'''   
def post_image(self, request, format=None):
    img_url = request.data
    name = urlparse(img_url).path.split('/')[-1]
    response = requests.get(img_url)
    if response.status_code == 200:
        serializer = PlanPicturesSerializer(
            data={"picture":ContentFile(response.content)})
    if serializer.is_valid():
        serializer.save(owner=self.request.user)
        return Response(status=status.HTTP_201_CREATED)
    return Response(status=status.HTTP_400_BAD_REQUEST)

'''


'''
def lettreJson(request):
    lettres = LettreListView()
    listelettres = lettres.as_view()

    print(json.loads(listelettres))
    return render(request, 'api.html', {'lettres': listelettres})
'''
