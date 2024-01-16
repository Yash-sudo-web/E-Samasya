from rest_framework.response import Response
from rest_flex_fields import FlexFieldsModelViewSet
from .serializers import UserViewSerializer
from DFToken.authentication import MultiTokenAuthentication
from rest_framework.permissions import IsAuthenticated
from login.models import DFUser
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend


class UserViewSet(FlexFieldsModelViewSet):
    serializer_class = UserViewSerializer
    authentication_classes = [MultiTokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = DFUser.objects.all()
    filter_backends = [filters.OrderingFilter, DjangoFilterBackend]
    filterset_fields = ['id']
    # get specific user data depending on pk
    def get_queryset(self):
        pk = self.kwargs.get('pk')
        if pk:
            queryset = DFUser.objects.filter(id=pk)
        else:
            queryset = DFUser.objects.all()
        return queryset

    def perform_update(self, serializer):
        pk = self.kwargs.get('pk')
        if pk:
            serializer.save(id=pk)
        else:
            serializer.save(id=self.request.user.id)
    
    # Use post request to update user data
    def update(self, request, *args, **kwargs):
        pk = self.kwargs.get('pk')
        if pk:
            instance = DFUser.objects.get(id=pk)
        else:
            instance = DFUser.objects.get(id=self.request.user.id)
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        if pk:
            return Response({'msg': 'data updated', 'userid': pk})
        else:
            return Response({'msg': 'data updated', 'userid': self.request.user.id})
