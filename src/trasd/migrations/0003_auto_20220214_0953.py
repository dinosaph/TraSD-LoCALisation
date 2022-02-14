# Generated by Django 3.2.12 on 2022-02-14 07:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sessions', '0001_initial'),
        ('trasd', '0002_alter_trafficsign_country'),
    ]

    operations = [
        migrations.CreateModel(
            name='ScanEntry',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('img_src', models.ImageField(null=True, upload_to='', verbose_name='Image')),
                ('scan_date', models.DateTimeField(verbose_name='Scan Date')),
                ('session', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='sessions.session')),
            ],
            options={
                'ordering': ['-session'],
            },
        ),
        migrations.AlterModelOptions(
            name='trafficsign',
            options={'ordering': ['-class_id', '-country']},
        ),
        migrations.AddField(
            model_name='trafficsign',
            name='img_src',
            field=models.ImageField(null=True, upload_to='', verbose_name='Image'),
        ),
        migrations.AddField(
            model_name='trafficsign',
            name='info_link',
            field=models.URLField(null=True, verbose_name='Info Link'),
        ),
        migrations.AddField(
            model_name='trafficsign',
            name='meaning',
            field=models.TextField(null=True, verbose_name='Meaning'),
        ),
        migrations.AddField(
            model_name='trafficsign',
            name='summary',
            field=models.TextField(null=True, verbose_name='Summary'),
        ),
        migrations.AddField(
            model_name='trafficsign',
            name='title',
            field=models.CharField(max_length=30, null=True, verbose_name='Title'),
        ),
        migrations.AlterField(
            model_name='trafficsign',
            name='class_id',
            field=models.PositiveIntegerField(help_text='Enter traffic sign training class id', verbose_name='Class ID'),
        ),
        migrations.CreateModel(
            name='ScanReport',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('entries', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='trasd.scanentry')),
            ],
            options={
                'ordering': ['-id'],
            },
        ),
        migrations.AddField(
            model_name='scanentry',
            name='sign_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='trasd.trafficsign'),
        ),
    ]