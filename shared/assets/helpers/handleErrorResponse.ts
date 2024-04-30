import { toast } from "react-toastify";

import { Nullable } from "@/shared/assets/types/types";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface FieldError {
  field: string;
  message: string;
}

interface ErrorData {
  errorMessages?: FieldError[];
  message?: string;
}

export interface CatchingData {
  error: Nullable<string>;
  fieldErrors: Nullable<FieldError[]>;
}

export type ErrorsMessages = {
  errorsMessages: FieldError[];
};

export const handleErrorResponse = (
  error?: FetchBaseQueryError | SerializedError,
): CatchingData | undefined => {
  if (!error) {
    return;
  }

  switch (true) {
    case "error" in error: {
      const errorMessage = `${error.status} - ${error.error}`;

      toast.error(errorMessage);

      return {
        error: errorMessage,
        fieldErrors: null,
      };
    }
    case "message" in error: {
      const errorMessage =
        `${error.code} - Serialized error:` +
        (error.message || "error message was not received");

      toast.error(errorMessage);

      return {
        error: errorMessage,
        fieldErrors: null,
      };
    }
    case "data" in error: {
      const errorData = error.data as ErrorData;

      const errorMessage = `${error.status} - ${errorData.message || "Request error"}`;

      if (error.status !== 400) {
        toast.error(errorMessage);
      }

      return {
        error: errorMessage,
        fieldErrors: errorData.errorMessages || null,
      };
    }
    default: {
      const errorMessage =
        "Unknown error: error message and status error was not received";

      toast.error(errorMessage);

      return {
        error: "Unknown error: error message and status error was not received",
        fieldErrors: null,
      };
    }
  }
};

export const validationError = (err: any): ErrorsMessages | null => {
  if ("errorMessages" in err) {
    return err.errorsMessages;
  }

  return null;
};
