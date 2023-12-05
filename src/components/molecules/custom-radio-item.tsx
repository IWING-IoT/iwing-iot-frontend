import { FormControl, FormItem, FormLabel } from "../ui/form";
import { RadioGroupItem } from "../ui/radio-group";

type CustomRadioItemProps = {
  value: string;
  children?: React.ReactNode;
};

export function CustomRadioItem({ value, children }: CustomRadioItemProps) {
  return (
    <FormItem className="flex flex-1 items-center space-x-3 space-y-0">
      <FormLabel className="flex flex-1 cursor-pointer gap-2 rounded-xl border bg-popover p-4 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 peer-data-[state=checked]:border-2 peer-data-[state=checked]:border-primary peer-data-[state=checked]:p-[15px] [&:has([data-state=checked])]:border-2 [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:p-[15px]">
        <FormControl>
          <RadioGroupItem
            value={value}
            className={`peer ${children ? "mt-0.5" : ""}`}
          />
        </FormControl>
        {children ? children : value}
      </FormLabel>
    </FormItem>
  );
}

export const CustomRadioItemContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="flex flex-1 flex-col">{children}</div>;
};

export const CustomRadioItemLabel = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <p className="text-sm font-medium">{children}</p>;
};

export const CustomRadioItemDescription = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <p className="text-sm font-normal text-muted-foreground">{children}</p>
  );
};
