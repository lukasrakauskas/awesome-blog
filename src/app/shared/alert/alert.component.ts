import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';

import { Alert, AlertType } from './alert.model';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() id = 'default-alert';

  alerts: Alert[] = [];
  alertSubscription: Subscription;
  routeSubscription: Subscription;

  constructor(private router: Router, private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertSubscription = this.alertService
      .onAlert(this.id)
      .subscribe((alert) => {
        if (!alert.message) {
          this.alerts = this.alerts.filter((x) => x.keepAfterRouteChange);
          this.alerts.forEach((x) => delete x.keepAfterRouteChange);
          return;
        }

        this.alerts.push(alert);

        if (alert.autoClose) {
          setTimeout(() => this.removeAlert(alert), 3000);
        }
      });

    this.routeSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.alertService.clear(this.id);
      }
    });
  }

  ngOnDestroy(): void {
    this.alertSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  removeAlert(alert: Alert): void {
    if (!this.alerts.includes(alert)) {
      return;
    }

    this.alerts = this.alerts.filter((x) => x !== alert);
  }

  cssClass(alert: Alert): string {
    if (!alert) {
      return;
    }

    const classes = ['alert', 'alert-dismissable'];

    const alertTypeClass = {
      [AlertType.Success]: 'alert alert-success',
      [AlertType.Error]: 'alert alert-danger',
      [AlertType.Info]: 'alert alert-info',
      [AlertType.Warning]: 'alert alert-warning',
    };

    classes.push(alertTypeClass[alert.type]);

    return classes.join(' ');
  }
}
