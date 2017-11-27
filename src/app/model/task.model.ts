export class Task {

  constructor(public name: String,
              private status: String) { }

  setStatus(newStatus: String) {
    this.status = newStatus;
  }

}
