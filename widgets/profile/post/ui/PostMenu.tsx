import { useState } from "react";

import { Edit, More, Trash } from "@/public";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components";

import d from "@/shared/components/dropDownMenu/dropDown.module.scss";

export const PostMenu = () => {
  const [open, setOpen] = useState(false);
  const onOpenChangeHandler = () => setOpen(!open);

  return (
    <DropdownMenu onOpenChange={onOpenChangeHandler} open={open}>
      <DropdownMenuTrigger>
        <Button icon={<More />} variant={"icon"} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align={"end"}>
        <DropdownMenuItem asChild>
          <Button className={d.item} icon={<Edit />} variant={"icon"}>
            Edit Post
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button
            className={d.item}
            icon={<Trash />}
            // onClick={}
            variant={"icon"}
          >
            Delete Post
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
