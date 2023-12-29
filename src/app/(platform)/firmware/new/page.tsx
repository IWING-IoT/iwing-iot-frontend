import { RouterBackButton } from "@/components/atoms/router-back-button";
import { NewFirmwareForm } from "@/components/forms/new-firmware-form";
import { HeaderTitle } from "@/components/molecules/header";
import { MainContainer } from "@/components/templates/main-container";

export default function New() {
  return (
    <div className="flex flex-1 justify-center">
      <MainContainer className="flex max-w-xl flex-1 gap-5">
        <div>
          <RouterBackButton
            variant="link"
            className="p-0"
            label="Back to firmware"
          />
          <HeaderTitle>Add new firmware</HeaderTitle>
        </div>
        <NewFirmwareForm />
      </MainContainer>
    </div>
  );
}
