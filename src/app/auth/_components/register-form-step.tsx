import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import type { UseFormReturn } from "react-hook-form";

interface RegisterFormStepProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  fields: string[];
  isPending: boolean;
}

const RegisterFormStep: React.FC<RegisterFormStepProps> = ({
  form,
  fields,
  isPending,
}) => {
  return (
    <>
      {fields.map((field) => (
        <div key={field}>
          <FormField
            control={form.control}
            name={field}
            render={({ field: fieldProps }) => (
              <FormItem>
                <FormLabel className="mb-2 block text-sm text-gray-300">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </FormLabel>
                <FormControl>
                  <Input
                    {...fieldProps}
                    placeholder={`Enter your ${field}`}
                    type={
                      field === "password" || field === "confirmPassword"
                        ? "password"
                        : "text"
                    }
                    disabled={isPending}
                    className="w-full rounded-lg border border-yellow-600/20 bg-zinc-800 px-4 py-4 text-sm text-gray-200 outline-yellow-500 placeholder:text-gray-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      ))}
    </>
  );
};

export default RegisterFormStep;
