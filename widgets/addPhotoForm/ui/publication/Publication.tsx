import React, { useState } from "react";
import Slider from "react-slick";

import { ArrowBack } from "@/public";
import { useAddPostMutation } from "@/shared/assets/api/post/post-api";
import {
  Avatar,
  Button,
  ControlledTextArea,
  Input,
  Typography,
} from "@/shared/components";
import { useAddPhotoForm } from "@/widgets/addPhotoForm/hooks";
import {
  NextArrowComponent,
  PrevArrowComponent,
} from "@/widgets/addPhotoForm/ui/croppingPhoto/carousel/arrow";

import s from "./publication.module.scss";

export const Publication = () => {
  const {
    control,
    cropImages,
    cropImagesWithFilter,
    errors,
    handleSubmit,
    onSubmit,
    watch,
  } = useAddPhotoForm();

  const [ind, setInd] = useState(0);
  const settings = {
    className: s.sliderContainer,

    draggable: false,
    fade: true,
    infinite: true,
    nextArrow: (
      <NextArrowComponent ind={ind} len={cropImages?.length} setInd={setInd} />
    ),
    prevArrow: (
      <PrevArrowComponent ind={ind} len={cropImages?.length} setInd={setInd} />
    ),
    slidesToScroll: 1,
    slidesToShow: 1,
    speed: 500,
    waitForAnimate: false,
  };
  const cropImage = cropImagesWithFilter.map((obj, index) => {
    return (
      <div className={s.imageContainer} key={index}>
        <img alt={""} src={obj.img} />
      </div>
    );
  });

  const handlePublish = () => {
    const form = document.getElementById("descriptionForm") as HTMLFormElement;

    if (form) {
      form.requestSubmit();
    }
  };
  const description = watch("description", "");
  const numLetters = description.length;

  return (
    <div>
      <div className={s.header}>
        <Button variant={"icon"}>
          <ArrowBack />
        </Button>
        <Typography variant={"h1"}>Publication</Typography>
        <Button onClick={handlePublish} variant={"link"}>
          <Typography variant={"h3"}>Publish</Typography>
        </Button>
      </div>
      <div className={s.filterContainer}>
        <Slider {...settings} className={`${s.slider} slick-list`}>
          {cropImage}
        </Slider>
        <div className={s.publicationDescriptionBlock}>
          <div className={s.formBlock}>
            <div className={s.avatarContainer}>
              <Avatar alt={"as"} className={s.avatar} size={"sm"} />
              <Typography variant={"regular_text-16"}>URLProfiele</Typography>
            </div>
            <form id={"descriptionForm"} onSubmit={handleSubmit(onSubmit)}>
              <ControlledTextArea
                autoComplete={"description"}
                control={control}
                error={errors.description?.message}
                // errorMessage={errors.email?.message}
                label={"Add publication descriptions"}
                name={"description"}
                placeholder={"description"}
              />
              <Typography className={s.numLettersText} variant={"small-text"}>
                {numLetters}/500
              </Typography>
            </form>
          </div>
          <div className={s.locationBlock}>
            <Input label={"Add location"} type={"location"} />
            <div>New York</div>
            <div>New York</div>
          </div>
        </div>
      </div>
    </div>
  );
};
