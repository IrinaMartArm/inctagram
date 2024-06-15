import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  Bookmark_outline,
  HeartOutline,
  HeartRed,
  HeartSmall,
  PaperPlane,
} from "@/public";
import {
  AvatarSimple,
  Button,
  ControlledTextField,
  Typography,
} from "@/shared/components";
import { PostMenu } from "@/widgets/profile/post/ui/PostMenu";

import s from "./post.module.scss";

export const Post = () => {
  const isOwner = true;
  const avatars = [<AvatarSimple title={""} />, <AvatarSimple title={""} />];

  const { control, handleSubmit, reset } = useForm({});

  return (
    <div className={s.root}>
      <div className={s.postInfoWrapper}>
        <div className={s.header}>
          <div className={s.content}>
            <AvatarSimple title={"me"} />
            <Typography variant={"h3"}>userName</Typography>
          </div>
          {isOwner && <PostMenu />}
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
                  icon={<HeartRed />}
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
            <div>{avatars.map((el) => el)}</div>
            <Typography variant={"regular_text-14"}>{2876} "Like"</Typography>
          </div>
          <Typography className={s.grey} variant={"small-text"}>
            July 3, 2021
          </Typography>
          <form className={s.input}>
            <ControlledTextField
              control={control}
              name={"comment"}
              placeholder={"Add a Comment..."}
              type={"text"}
            />
            <Button className={s.publish} variant={"icon"}>
              Publish
            </Button>
          </form>
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
