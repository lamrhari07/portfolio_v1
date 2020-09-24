
from django.contrib.auth.models import AbstractUser, UserManager
from django.db import models, transaction
from django.utils.translation import ugettext as _
from django.utils import timezone
from django.db.models.signals import post_save
from django.dispatch import receiver



class ProfileManager(UserManager):

    @transaction.atomic
    def create_user_profile(self, user):
        password = user.pop('password')
        user = self.create(**user)
        user.set_password(password)
        user.save()
        return user

class ProfileUser(AbstractUser):
    '''
        User Profile model
    '''
    GENDER = (
        (1, _('')),
        (2, _('Male')),
        (3, _('Female'))
    )

    description = models.TextField(_('Description'), default='')
    introduction = models.TextField(_('Introduction'), default='')
    avatar = models.ImageField(_('Avatar'), upload_to='avatar/', default='avatar/avatar.png')
    birth_date = models.DateField(_('Birth Date'), default='1994-06-15')
    gender = models.CharField(_('Gender'), max_length=10, choices=GENDER, default=1)
    phone = models.IntegerField(_('Phone'), default=0)
    projects = models.ManyToManyField('Projects', default=[], related_name='user_projects')

    objects = ProfileManager()
    
    def __str__(self):
        return self.username

    class Meta:
        db_table = 'user_profile'
        ordering = ('pk',)


class Projects(models.Model):

    LANGUAGE = (
        (1, _('')),
        (2, _('Python')),
        (3, _('JavaScript')),
        (4, _('TypeScript')),
        (5, _('Java'))
    )

    user = models.ForeignKey(ProfileUser, default='', on_delete=models.CASCADE, related_name='user_instance')
    name = models.CharField(_('Title'), max_length=255, default='')
    language = models.CharField(_('Programming Language'), max_length=10, choices=LANGUAGE, default=1)
    description = models.TextField(_('Description'), default='')
    git_url = models.CharField(_('Github Link'), max_length=255, default='')
    created_at = models.DateTimeField(_('Created at'), default=timezone.now)
    updated_at = models.DateTimeField(_('Updated at'), auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'project'
        ordering = ('-created_at',)

class UserProject(models.Model):
    user = models.OneToOneField(ProfileUser, default='', on_delete=models.CASCADE, related_name='user_project')
    projects = models.ManyToManyField(Projects, default=[], related_name='user_project_list')

    @property
    def user__username(self):
        return self.user.username

    class Meta:
        db_table = 'User Projects'

    def __str__(self):
        return self.projects.name


@receiver(post_save, sender=Projects)
def user_projects(sender, instance, created, **kwargs):
    if created:
        user = ProfileUser.objects.select_related('user_project').get(pk=instance.user.pk)
        user.projects.add(instance)
        if user.projects.count() >= 7:
            user.projects.remove(user.projects.last())
        