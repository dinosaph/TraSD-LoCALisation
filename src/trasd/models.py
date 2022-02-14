from enum import unique
from pickle import NONE
from pyexpat import model
from urllib import request
from django.db import models
from django.contrib.sessions.models import Session

class TrafficSign(models.Model):
    """ Model - Traffic Sign """

    COUNTRY_CHOICES = [
        ('RO', 'Romania'),
    ]

    # Fields
    class_id = models.PositiveIntegerField(verbose_name="Class ID", help_text="Enter traffic sign training class id")
    country = models.CharField(verbose_name="Country", max_length=2, choices=COUNTRY_CHOICES, default="RO")
    title = models.CharField(verbose_name="Title", max_length=30, null=True)
    img_src = models.ImageField(verbose_name="Image", null=True)
    meaning = models.TextField(verbose_name="Meaning", null=True)
    summary = models.TextField(verbose_name="Summary", null=True)
    info_link = models.URLField(verbose_name="Info Link", max_length=200, null=True)

    # Metadata
    class Meta:
        ordering = ['-class_id', '-country']
        unique_together = ('class_id', 'country')

    # Methods
    def get_absolute_url(self):
        """ Returns the url to access a particular instance of TrafficSign. """
        return reverse('model-detail-view', args=[str(self.id)])

    def __str__(self):
        """ String for representing the TrafficSign object (in Admin site etc.). """
        return "%s %s %s" % (self.id, self.class_id, self.title)

############################################################################################################################

class ScanEntry(models.Model):
    """ Model - Scan Entry """

    img_src = models.ImageField(verbose_name="Image", null=True)
    scan_date = models.DateTimeField(verbose_name="Scan Date")
    session = models.ForeignKey(Session, on_delete=models.SET_NULL, null=True) #ScanEntry.session.session_key
    sign_id = models.ForeignKey(TrafficSign, on_delete=models.SET_NULL, null=True)

    # Metadata
    class Meta:
        ordering = ['-session']

    # Methods
    def get_absolute_url(self):
        """ Returns the url to access a particular instance of TrafficSign. """
        return reverse('model-detail-view', args=[str(self.id)])

    def __str__(self):
        """ String for representing the TrafficSign object (in Admin site etc.). """
        return "%s %s %s" % (self.id, self.session, self.img_src)

############################################################################################################################

class ScanReport(models.Model):
    """ Model - Scan Report """

    entries = models.ForeignKey(ScanEntry, on_delete=models.SET_NULL, null=True)

    # Metadata
    class Meta:
        ordering = ['-id']

    # Methods
    def get_absolute_url(self):
        """ Returns the url to access a particular instance of TrafficSign. """
        return reverse('model-detail-view', args=[str(self.id)])

    def __str__(self):
        """ String for representing the TrafficSign object (in Admin site etc.). """
        return "%s %s" % (self.id, self.entries)