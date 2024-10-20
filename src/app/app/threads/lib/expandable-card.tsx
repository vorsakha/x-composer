"use client";

import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { FormSchema as Threads } from "@/app/app/lib/form-schema";
import { LocalStorageService } from "@/service/local-storage";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

export function ExpandableCard() {
  const [active, setActive] = useState<Threads | [number] | boolean | null>(
    null,
  );
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  const cards = useMemo(() => {
    return LocalStorageService.getThreads();
  }, [active]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  const handleDeleteThread = (name: string) => {
    LocalStorageService.deleteThread(name);
    toast("Thread successfully deleted!");
    setActive(null);
  };

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.button
              key={`button-${(active as Threads).name}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${(active as Threads).name}-${id}`}
              ref={ref}
              className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 rounded overflow-hidden"
            >
              <div>
                <div className="flex justify-between items-center p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${(active as Threads).name}-${id}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200"
                    >
                      {(active as Threads).name}
                    </motion.h3>
                  </div>

                  <div className="flex gap-2">
                    <motion.a
                      layoutId={`anchor-${(active as Threads).name}-${id}`}
                      href={`thread/${(active as Threads).name}`}
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                    >
                      Edit Thread
                    </motion.a>
                    <motion.button
                      layoutId={`button-${(active as Threads).name}-${id}`}
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 h-9 px-4 py-2"
                      onClick={() =>
                        handleDeleteThread((active as Threads).name)
                      }
                    >
                      Remove Thread
                    </motion.button>
                  </div>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400"
                  >
                    {(active as Threads).thread.map((t, index) => (
                      <p key={index}>{t.tweet}</p>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-2xl mx-auto w-full gap-4">
        {cards.map((card) => (
          <motion.div
            layoutId={`card-${card.name}-${id}`}
            key={`card-${card.name}-${id}`}
            onClick={() => setActive(card)}
            className="p-2 flex flex-col md:flex-row justify-between items-center rounded cursor-pointer"
          >
            <Card className="w-full h-full rounded md:h-fit md:max-h-[90%] flex flex-col justify-center bg-white dark:bg-neutral-900 overflow-hidden hover:bg-neutral-50">
              <CardContent className="p-4">
                <div className="flex gap-4 flex-col md:flex-row ">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${card.name}-${id}`}
                      className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left"
                    >
                      {card.name}
                    </motion.h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
