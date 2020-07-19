export class Alert {
  constructor(init?: Partial<Alert>) {
    Object.assign(this, init);
  }

  id: string;
  type: AlertType;
  message: string;
  autoClose = true;
  keepAfterRouteChange: boolean;
  fade: boolean;
}

export enum AlertType {
  Success,
  Error,
  Info,
  Warning,
}
