import { PayPalIcon, StripeIcon } from '@/public'
import { Button, Card, Tab, Typography } from '@/shared/components'
import { RadioGroup } from '@/shared/components/radioGroup'
import { useAccountManager } from '@/widgets'

import s from './accountManager.module.scss'
export const AccountManager = () => {
  const {
    accountManagerOptions,
    activeRadio,
    changeActiveRadioItem,
    changeSubscriptionCost,
    options,
    subscriptionCosts,
    t,
  } = useAccountManager()

  return (
    <div>
      <Tab defaultValue={'Account Management'} options={options} />
      <div className={s.container}>
        <div className={s.accountTypeContainer}>
          <Typography variant={'h3'}>{t.profileSettingAccountManager.accountType}</Typography>
          <Card className={s.radioGroupContainer}>
            <RadioGroup
              defaultValue={'Personal'}
              onValueChange={changeActiveRadioItem}
              options={accountManagerOptions}
            />
          </Card>
        </div>
        <div>
          {activeRadio === 'Business' && (
            <div className={s.accountTypeContainer}>
              <Typography variant={'h3'}>
                {t.profileSettingAccountManager.yourSubscriptionCosts}
              </Typography>
              <Card className={s.radioGroupContainer}>
                <RadioGroup onValueChange={changeSubscriptionCost} options={subscriptionCosts} />
              </Card>
              <div className={s.paymentOptionsContainer}>
                <Button onClick={() => {}} variant={'icon'}>
                  <PayPalIcon />
                </Button>
                <Typography variant={'regular_text-14'}>
                  {t.profileSettingAccountManager.or}
                </Typography>
                <Button onClick={() => {}} variant={'icon'}>
                  <StripeIcon />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
