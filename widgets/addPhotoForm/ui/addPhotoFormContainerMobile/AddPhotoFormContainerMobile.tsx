import { ChangeEvent, useEffect, useRef, useState } from "react";

import { Button, Modal, Typography } from "@/shared/components";

import s from "./addPhotoFormContainerMobile.module.scss";

const AddPhotoFormContainerMobile = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFiles(e.target.files);
    }
  };

  return (
    <div className={s.container}>
      <input
        onChange={handleFileChange}
        ref={inputRef}
        style={{ display: "none" }}
        type={"file"}
      />
      <Button onClick={() => setModalOpen(true)}>Выбрать фото</Button>

      <Modal onOpenChange={() => setModalOpen(false)} open={modalOpen}>
        +
        <div className={s.modalContent}>
          <Typography variant={"h1"}>Выберите фото</Typography>
          <Button onClick={handleClick}>Открыть проводник</Button>

          {selectedFiles && (
            <div className={s.selectedFiles}>
              <Typography variant={"h1"}>Выбранные файлы:</Typography>
              <ul>
                {Array.from(selectedFiles).map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}

          <Button onClick={() => setModalOpen(false)}>Готово</Button>
        </div>
      </Modal>
    </div>
  );
};

export default AddPhotoFormContainerMobile;
