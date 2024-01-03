import { Label } from "@/components/ui/label";
import { Input } from "./ui/input";
import { forwardRef } from "react";

interface FormInputProps {
  id: string;
  label?: string;
  type?: string;
  name: string;
  placeholder?: string;
  defaultValue?: number;
  className?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ id, label, placeholder, defaultValue = 0, className }, ref) => {
    return (
      <div className="space-y-2">
        <div className="space-y-1">
          {label ? (
            <Label
              htmlFor={id}
              className="text-sm text-semibold text-neutral-800"
            >
              {label}
            </Label>
          ) : null}
          <Input
            placeholder={placeholder}
            name={id}
            id={id}
            type="number"
            className={className}
            defaultValue={defaultValue}
            ref={ref}
          />
        </div>
      </div>
    );
  },
);

FormInput.displayName = "FormInput";
