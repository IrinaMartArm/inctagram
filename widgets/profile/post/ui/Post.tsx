import { useState } from "react";

import {
  Bookmark_outline,
  Edit,
  HeartOutline,
  HeartSmall,
  More,
  PaperPlane,
  Trash,
} from "@/public";
import {
  AvatarSimple,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Typography,
} from "@/shared/components";
import { Slider } from "@/shared/components/slider/Slider";

import s from "./post.module.scss";
import d from "@/shared/components/dropDownMenu/dropDown.module.scss";

export const Post = () => {
  const [open, setOpen] = useState(false);
  const onOpenChangeHandler = () => setOpen(!open);
  const isOwner = true;
  const avatars = [<AvatarSimple title={""} />, <AvatarSimple title={""} />];

  const Menu = () => {
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
            <Button className={d.item} icon={<Trash />} variant={"icon"}>
              Delete Post
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <div className={s.root}>
      <Slider />
      <div className={s.postInfoWrapper}>
        <div className={s.header}>
          <div className={s.content}>
            <AvatarSimple title={"me"} />
            <Typography variant={"h3"}>userName</Typography>
          </div>
          {isOwner && <Menu />}
        </div>
        <div className={s.contentWrapper}>
          <div className={s.content}>
            <AvatarSimple title={"me"} />
            <Typography variant={"h3"}>Lorem</Typography>
          </div>
          <div className={s.content}>
            <AvatarSimple title={"me"} />
            <div className={s.comment}>
              <div className={s.contentInner}>
                <Typography variant={"h3"}>Lorem</Typography>
                <Button
                  icon={<HeartSmall />}
                  onClick={() => {}}
                  variant={"icon"}
                />
              </div>
              <Typography className={s.grey} variant={"small-text"}>
                2 hours ago
              </Typography>
            </div>
          </div>
          <div className={s.content}>
            <AvatarSimple title={"me"} />
            <div className={s.comment}>
              <div className={s.contentInner}>
                <Typography variant={"h3"}>Lorem</Typography>
                <Button
                  icon={<HeartSmall />}
                  onClick={() => {}}
                  variant={"icon"}
                />
              </div>
              <Typography className={s.color} variant={"small-text"}>
                2 hours ago
              </Typography>
            </div>
          </div>
        </div>
        <div className={s.bottomBlock}>
          <div className={s.icons}>
            <div>
              <HeartOutline />
              <PaperPlane />
            </div>
            <Bookmark_outline />
          </div>
          <div className={s.avatars}>
            {avatars.map((el) => el)}
            <Typography variant={"regular_text-14"}>{}"Like"</Typography>
          </div>
          <Typography className={s.grey} variant={"small-text"}>
            July 3, 2021
          </Typography>
          <div className={s}></div>
        </div>
      </div>
    </div>
  );
};

const getInitials = (inputString: string) => {
  const words = inputString.trim().split(/\s+/);
  const firstInitial = words[0] ? words[0].charAt(0).toUpperCase() : "";
  const secondInitial = words[1] ? words[1].charAt(0).toUpperCase() : "";

  return firstInitial + secondInitial;
};
