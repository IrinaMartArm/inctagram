import React, { useEffect } from 'react'

import { PayPalIcon, StripeIcon } from '@/public'
import {
  Button,
  Card,
  CheckBox,
  Loader,
  Modal,
  ModalWindow,
  Tab,
  Typography,
} from '@/shared/components'
import { RadioGroup } from '@/shared/components/radioGroup'
import { useAccountManager } from '@/widgets'

import s from './accountManager.module.scss'
export const AccountManager = () => {
  const {
    accountManagerOptions,
    activeRadio,
    autoRenewal,
    changeActiveRadioItem,
    changeSubscriptionCost,
    currentSubscriptionData,
    expireAt,
    handleChangeAutoRenewal,
    handleCloseModal,
    handlePay,
    isLoading,
    isModalOpen,
    modalTitle,
    nextPayment,
    options,
    subscriptionCosts,
    t,
  } = useAccountManager()

  useEffect(() => {
    if (currentSubscriptionData) {
      changeActiveRadioItem('Business')
    } else {
      changeActiveRadioItem('Personal')
    }
  }, [currentSubscriptionData, changeActiveRadioItem])

  const updatedAccountManagerOptions = accountManagerOptions.map(option => ({
    ...option,
    disabled: activeRadio === 'Business' && option.value === 'Personal',
  }))

  return (
    <div>
      <Tab defaultValue={'Account Management'} options={options} />
      <div className={s.container}>
        <div className={s.csWrapper}>
          <Typography variant={'h3'}>
            {t.profileSettingAccountManager.currentSubscription}
          </Typography>
          <Card className={s.csContainer}>
            <div className={s.csMeta}>
              <Typography className={s.csText} variant={'regular_text-14'}>
                {t.profileSettingAccountManager.expireAt}
              </Typography>
              <Typography variant={'regular_text-14'}>{expireAt}</Typography>
            </div>
            <div className={s.csMeta}>
              <Typography className={s.csText} variant={'regular_text-14'}>
                {t.profileSettingAccountManager.nextPayment}
              </Typography>
              <Typography variant={'regular_text-14'}>{nextPayment}</Typography>
            </div>
          </Card>
          <CheckBox
            checked={autoRenewal}
            label={t.profileSettingAccountManager.autoRenewal}
            name={'Auto-Renewal'}
            onCheckedChange={handleChangeAutoRenewal}
            title={'Auto-Renewal'}
          />
        </div>
        <div className={s.accountTypeContainer}>
          <Typography variant={'h3'}>{t.profileSettingAccountManager.accountType}</Typography>
          <Card className={s.radioGroupContainer}>
            <RadioGroup
              defaultValue={currentSubscriptionData ? 'Business' : 'Personal'}
              onValueChange={changeActiveRadioItem}
              options={updatedAccountManagerOptions}
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
                <Button disabled={isLoading} onClick={() => handlePay('PAYPAL')} variant={'icon'}>
                  <PayPalIcon />
                </Button>
                <Typography variant={'regular_text-14'}>
                  {t.profileSettingAccountManager.or}
                </Typography>
                <Button disabled={isLoading} onClick={() => handlePay('STRIPE')} variant={'icon'}>
                  <StripeIcon />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal onOpenChange={handleCloseModal} open={isModalOpen} title={modalTitle}>
        <ModalWindow callback={handleCloseModal} text={modalTitle} />
      </Modal>
    </div>
  )
}
