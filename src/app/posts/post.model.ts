export class Post {
  constructor({ date = new Date(), ...rest }: Partial<Post>) {
    Object.assign(this, { date, ...rest });
  }

  id: number;
  title: string;
  body: string;
  date: Date;
}
