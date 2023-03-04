from django.core.files.storage import default_storage

def file_cleanup(sender, **kwargs):
    path = str(kwargs['instance'].image)
    print(path)
    default_storage.delete(path)
