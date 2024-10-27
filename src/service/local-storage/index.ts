import { toast } from "sonner";

import { FormSchema as Thread } from "@/app/app/lib/form-schema";

const LocalStorageService = {
  getThreads(): Thread[] {
    return JSON.parse(localStorage.getItem("threads") || "[]");
  },
  setThreads(threads: Thread) {
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
  getThread(id?: string): Thread | undefined {
    const existingThreads = this.getThreads() || [];
    const thread = existingThreads.find((t) => t.id === id);

    return thread;
  },
  updateThread(id: string, thread: Thread) {
    const existingThreads = this.getThreads() || [];
    const threadIndex = existingThreads.findIndex((t) => t.id === id);

    if (threadIndex === -1) {
      toast("Thread not found!");
      return null;
    }

    const updatedThreads = existingThreads.map((t) => {
      if (t.id === id) {
        return thread;
      }
      return t;
    });

    toast("Thread successfully saved!");
    return localStorage.setItem("threads", JSON.stringify(updatedThreads));
  },
};

export { LocalStorageService };
