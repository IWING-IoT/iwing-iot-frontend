import { CopyableInput } from "@/components/molecules/copyable-input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AlertCircle, KeyRound, RotateCcw } from "lucide-react";
import { PatchActionDialog } from "../dialogs/patch-action-dialog";

type JWTDropdownProps = { jwt: string; deviceId: string };

export function JWTDropdown({ jwt, deviceId }: JWTDropdownProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"outline"}>
          <KeyRound className="mr-2 h-5 w-5" />
          JWT
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end">
        <div className="flex flex-col gap-4">
          <h4 className="font-semibold">JSON Web Token</h4>
          <CopyableInput className="min-w-[10rem]" value={jwt} />
          <PatchActionDialog
            variant="warning"
            icon={<AlertCircle />}
            title="Regenerate JWT"
            description="This action can't be undone. Regenerating the JWT token will invalidate the current token and generate a new one."
            id={deviceId}
            action="regenerateJwt"
          >
            <Button variant={"outline"}>
              <RotateCcw className="mr-2 h-5 w-5" />
              Regenerate
            </Button>
          </PatchActionDialog>
        </div>
      </PopoverContent>
    </Popover>
  );
}
