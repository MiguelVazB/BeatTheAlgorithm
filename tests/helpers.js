export class FakeClock {
  now = 0;
  nextId = 1;
  tasks = new Map();
  setTimeout = (callback, delay = 0) => this.add(callback, delay, 0);
  setInterval = (callback, delay) => this.add(callback, delay, delay);
  clearTimeout = (id) => this.tasks.delete(id);
  clearInterval = this.clearTimeout;
  add(callback, delay, interval) {
    const id = this.nextId++;
    this.tasks.set(id, { callback, at: this.now + delay, interval });
    return id;
  }
  tick(duration) {
    const target = this.now + duration;
    let count = 0;
    while (this.tasks.size) {
      const [id, task] = [...this.tasks.entries()].sort((a, b) => a[1].at - b[1].at)[0];
      if (task.at > target) break;
      if (++count > 10000) throw new Error('Runaway timer');
      this.now = task.at;
      this.tasks.delete(id);
      if (task.interval) this.tasks.set(id, { ...task, at: this.now + task.interval });
      task.callback();
    }
    this.now = target;
  }
}
