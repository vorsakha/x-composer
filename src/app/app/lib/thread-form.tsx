"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { v4 as uuid } from "uuid";

import { FormSchema, formSchema } from "@/app/app/lib/form-schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LocalStorageService } from "@/service/local-storage";

interface ThreadFormProps {
  selectedThreadId?: string;
}

export default function ThreadForm({ selectedThreadId }: ThreadFormProps) {
  const selectedThread = LocalStorageService.getThread(selectedThreadId);

  const router = useRouter();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: selectedThread?.id ?? uuid(),
      name: selectedThread?.name ?? "",
      thread: selectedThread?.thread ?? [
        {
          id: 0,
          tweet: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray<FormSchema, "thread">({
    control: form.control,
    name: "thread",
  });

  const handleAppendNewTweet = () => {
    const thread = form.watch("thread");
    const lastTweet = thread[fields.length - 1];
    const canBeAppended = lastTweet?.tweet.trim() !== "";

    if (canBeAppended) {
      append({
        id: fields.length,
        tweet: "",
      });
    } else {
      toast("The previous tweet cannot be empty!");
    }
  };

  const onSubmit = (values: FormSchema) => {
    if (selectedThread) {
      LocalStorageService.updateThread(selectedThread.id, values);

      router.push("/app/threads");
    } else {
      LocalStorageService.setThreads(values);

      toast("Thread successfully saved!");
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-[400px] mx-auto"
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Content name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-6">
            {fields.map((f, index) => (
              <FormField
                key={f.id}
                control={form.control}
                name={`thread.${index}.tweet`}
                render={({ field }) => (
                  <div className="relative">
                    {index === 0 && (
                      <FormLabel className="text-sm">Thread</FormLabel>
                    )}
                    <FormItem>
                      {index !== 0 && (
                        <Button
                          type="button"
                          variant="ghost"
                          className="absolute right-0 top-[-28px] m-0 px-2 text-red-700 hover:text-red-400 hover:bg-transparent"
                          onClick={() => remove(index)}
                        >
                          <X />
                        </Button>
                      )}
                      <FormControl>
                        <Textarea
                          maxLength={280}
                          placeholder="Tweet content"
                          className="h-32 w-full pr-4"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </div>
                )}
              />
            ))}

            {!fields.length && (
              <FormDescription className="text-center">
                Add a tweet
              </FormDescription>
            )}
            <Button
              type="button"
              variant="ghost"
              className="mt-2 flex items-center gap-2 mx-auto hover:bg-transparent hover:opacity-60"
              onClick={handleAppendNewTweet}
            >
              <PlusCircle />
            </Button>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => form.reset()}
            disabled={!form.formState.isDirty}
          >
            Reset
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  );
}
