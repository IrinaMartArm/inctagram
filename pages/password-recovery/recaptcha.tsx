import React, { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

type Props = {
  onChange: (token: null | string) => void;
};

const ReCAPTCHAWidget = ({ onChange }: Props) => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const RECAPTCHA_SITE_KEY = "6LexQMApAAAAAM78fgHXvRm05K7dio7fXEtILmI2";

  return (
    <ReCAPTCHA
      onChange={onChange}
      ref={recaptchaRef}
      sitekey={RECAPTCHA_SITE_KEY}
      theme={"dark"}
    />
  );
};

export default ReCAPTCHAWidget;
