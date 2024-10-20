import { FormSchema as Threads } from "@/app/app/lib/form-schema";

const LocalStorageService = {
  getThreads(): Threads[] {
    return JSON.parse(localStorage.getItem("threads") || "[]");
  },
  setThreads(threads: Threads) {
    const existingThreads = this.getThreads() || [];
    existingThreads.push(threads);

    localStorage.setItem("threads", JSON.stringify(existingThreads));
  },
  deleteThread(name: string) {
    const existingThreads = this.getThreads() || [];
    const filteredThreads = existingThreads.filter(
      (thread) => thread.name !== name,
    );

    localStorage.setItem("threads", JSON.stringify(filteredThreads));
  },
};

export { LocalStorageService };
