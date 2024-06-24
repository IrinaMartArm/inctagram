import { useState } from 'react'

import { Edit, More, Trash } from '@/public'
import { useTranslationPages } from '@/shared/assets'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Modal,
  ModalWindow,
} from '@/shared/components'

import d from '@/shared/components/dropDownMenu/dropDown.module.scss'

export const PostMenu = () => {
  const { t } = useTranslationPages()
  const [open, setOpen] = useState(false)
  const onOpenChangeHandler = () => setOpen(!open)

  return (
    <DropdownMenu onOpenChange={onOpenChangeHandler} open={open}>
      <DropdownMenuTrigger>
        <More />
      </DropdownMenuTrigger>
      <DropdownMenuContent align={'end'}>
        <DropdownMenuItem asChild>
          <Button className={d.item} icon={<Edit />} variant={'icon'}>
            {/*{t{'post.editPost'}}*/}
            Edit Post
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Modal
            title={'Log Out'}
            trigger={
              <Button className={d.item} icon={<Trash />} variant={'icon'}>
                Delete Post
              </Button>
            }
          >
            <ModalWindow callback={() => {}} text={'Are you sure you want to delete this post?'} />
          </Modal>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
