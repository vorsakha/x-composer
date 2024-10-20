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
};

export { LocalStorageService };
