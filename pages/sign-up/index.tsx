import { useRef, useState } from "react";

import { useSignUpMutation } from "@/shared/assets/api/auth/auth-api";
import { handleErrorResponse } from "@/shared/assets/helpers/handleErrorResponse";
import { setToLocalStorage } from "@/shared/assets/helpers/setToLocalStorage";
import { UseFormRef } from "@/shared/assets/types/form";
import { HeadMeta } from "@/shared/components/headMeta/HeadMeta";
import { getLayout } from "@/shared/components/layout/baseLayout/BaseLayout";
import { Modal } from "@/shared/components/modals";
import { EmailSent } from "@/widgets";
import { SignUpCard } from "@/widgets/auth/signUp/ui/SignUp";
import { SignUpFormFields } from "@/widgets/auth/signUp/validators/validators";

const SignUp = () => {
  const ref = useRef<UseFormRef<SignUpFormFields>>(null);
  const [open, setOpen] = useState(false);

  const [signUp, { isLoading }] = useSignUpMutation();

  const handleSubmit = async ({
    agree,
    confirm,
    ...data
  }: SignUpFormFields) => {
    setToLocalStorage("email", data.email);
    setToLocalStorage("username", data.username);

    signUp(data).then((res) => {
      if ("data" in res) {
        setOpen(true);
      }
      if ("error" in res && ref.current) {
        const setError = ref.current.setError;

        const errors = handleErrorResponse<SignUpFormFields>(res.error);

        errors?.fieldErrors?.forEach((error) => {
          setError(error.field, { message: error.message });
        });
      }
    });
  };

  const onOpenChangeHandler = (open: boolean) => {
    setOpen(open);
    ref.current?.reset();
  };

  let email;

  if (typeof window !== "undefined") {
    email = localStorage.getItem("email");
  }

  return (
    <>
      <HeadMeta title={"Sign Up"} />

      <Modal
        onOpenChange={onOpenChangeHandler}
        open={open}
        title={"Email sent"}
      >
        <EmailSent email={email || ""} />
      </Modal>
      <SignUpCard isLoading={isLoading} onSubmit={handleSubmit} />
    </>
  );
};

SignUp.getLayout = getLayout;
export default SignUp;
