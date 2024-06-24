import { useState } from 'react'

import { Edit, More, Trash } from '@/public'
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
