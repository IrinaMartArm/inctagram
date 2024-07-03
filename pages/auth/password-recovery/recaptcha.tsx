import React, { useRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

type Props = {
  onChange: (token: null | string) => void
}

const ReCAPTCHAWidget = ({ onChange }: Props) => {
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  // const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const recaptchaSiteKey = '6LexQMApAAAAAM78fgHXvRm05K7dio7fXEtILmI2'

  return (
    <ReCAPTCHA onChange={onChange} ref={recaptchaRef} sitekey={recaptchaSiteKey} theme={'dark'} />
  )
}

export default ReCAPTCHAWidget
