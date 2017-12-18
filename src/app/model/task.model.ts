export class Task {

  constructor(public name: string,
              private status: string) { }

  setStatus(newStatus: string) {
    this.status = newStatus;
  }

}
