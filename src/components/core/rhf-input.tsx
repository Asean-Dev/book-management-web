import { Controller, useFormContext } from "react-hook-form";

import { Label } from "../ui/label";
import { Input } from "../ui/input";

export const RHFInput = ({
  label,
  name,
  type,
}: {
  label: string;
  name: string;
  type: string;
}) => {
  const {
    formState: { errors },
    control,
  } = useFormContext();
  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Input {...field} type={type} className="h-[40px]" />
        )}
      />
      {errors[name] && (
        <p className="text-red-500">{errors[name]?.message as string}</p>
      )}
    </div>
  );
};
