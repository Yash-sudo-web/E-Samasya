from login.models import DFUser
from rest_flex_fields.serializers import FlexFieldsModelSerializer


class UserViewSerializer(FlexFieldsModelSerializer):
    class Meta:
        model = DFUser
        fields = ['id', 'name', 'surname', 'email', 'phone', 'profile_img' , 'about', 'createdAt']
        depth = 1

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)
