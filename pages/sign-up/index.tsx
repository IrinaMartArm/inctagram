import { useRef, useState } from "react";

import { authActions } from "@/entities";
import { userEmailSelector } from "@/entities/auth/model/auth-slice";
import { useTranslationPages } from "@/shared/assets";
import { useSignUpMutation } from "@/shared/assets/api/auth/auth-api";
import { useAppDispatch, useAppSelector } from "@/shared/assets/api/store";
import { handleErrorResponse } from "@/shared/assets/helpers/handleErrorResponse";
import { setToLocalStorage } from "@/shared/assets/helpers/setToLocalStorage";
import { UseFormRef } from "@/shared/assets/types/form";
import { HeadMeta } from "@/shared/components/headMeta/HeadMeta";
import { getLayout } from "@/shared/components/layout/baseLayout/BaseLayout";
import { Modal } from "@/shared/components/modals";
import { EmailSent } from "@/widgets";
import { SignUpCard } from "@/widgets/auth/signUp/ui/SignUp";
import { SignUpFormFields } from "@/widgets/auth/signUp/validators/validators";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

type FieldsError = {
  [key: string]: { field: string; message: string }[];
};

const SignUp = () => {
  const dispatch = useAppDispatch();
  const ref = useRef<UseFormRef<SignUpFormFields>>(null);
  const [open, setOpen] = useState(false);
  const { t } = useTranslationPages();
  const email = useAppSelector(userEmailSelector);

  const [signUp, { isLoading }] = useSignUpMutation();

  const handleSubmit = async ({
    agree,
    confirm,
    ...data
  }: SignUpFormFields) => {
    dispatch(authActions.setEmail(data.email));
    setToLocalStorage("username", data.username);
    try {
      await signUp(data).unwrap();

      setOpen(true);
    } catch (e: unknown) {
      if (e as FetchBaseQueryError) {
        const { errorsMessages } = (e as FetchBaseQueryError)
          .data as FieldsError;
        const setError = ref.current?.setError;

        if (errorsMessages[0].field) {
          const err = errorsMessages[0].field;

          if (err === "username") {
            setError && setError(err, { message: t.usernameExistsError });
          }

          if (err === "email") {
            setError && setError(err, { message: t.emailExistsError });
          }
        }
      }
      if (e && ref.current) {
        const setFieldError = ref.current.setError;

        const errors = handleErrorResponse<SignUpFormFields>(e);

        errors?.fieldErrors?.forEach((error) => {
          setFieldError(error.field, { message: error.message });
        });
      }
    }
  };

  const onOpenChangeHandler = (open: boolean) => {
    setOpen(open);
    ref.current?.reset();
  };

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
      <SignUpCard isLoading={isLoading} onSubmit={handleSubmit} ref={ref} />
    </>
  );
};

SignUp.getLayout = getLayout;
export default SignUp;
