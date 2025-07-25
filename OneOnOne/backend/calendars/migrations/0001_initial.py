# Generated by Django 5.0.3 on 2025-07-21 20:13

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Calendar',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=120)),
                ('comment', models.TextField(blank=True, max_length=200)),
                ('date_time_created', models.DateTimeField(auto_now_add=True)),
                ('date_time_modified', models.DateTimeField(auto_now=True)),
                ('status', models.TextField(choices=[('created', 'In Progress'), ('submitted', 'Submitted'), ('finalized', 'Finalized')], default='submitted')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('txt', models.TextField()),
                ('calendar', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='calendars.calendar')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='TimeSlot',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('preference', models.IntegerField(choices=[(1, 'Low Preference'), (2, 'Medium Preference'), (3, 'High Preference')])),
                ('start_date_time', models.DateTimeField()),
                ('duration', models.IntegerField(default=30)),
                ('comment', models.TextField(blank=True, max_length=200)),
                ('last_modified', models.DateTimeField(auto_now=True)),
                ('calendar', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='timeslots', to='calendars.calendar')),
            ],
        ),
        migrations.AddField(
            model_name='calendar',
            name='finalized_timeslot',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='finalizing_calendars', to='calendars.timeslot'),
        ),
        migrations.CreateModel(
            name='CalendarContact',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('has_submitted', models.BooleanField(default=False)),
                ('calendar', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='calendars.calendar')),
                ('contact', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('calendar', 'contact')},
            },
        ),
        migrations.CreateModel(
            name='TimeSlotVote',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('preference', models.IntegerField(choices=[(0, 'Not Available'), (1, 'Low Preference'), (2, 'Medium Preference'), (3, 'High Preference')])),
                ('calendar', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='calendars.calendar')),
                ('contact', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('timeslot', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='calendars.timeslot')),
            ],
            options={
                'unique_together': {('contact', 'timeslot')},
            },
        ),
    ]
