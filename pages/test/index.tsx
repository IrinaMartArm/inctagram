import React, { useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import s from "./test.module.scss";

const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const users = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
];

const MyComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userList, setUserList] = useState(users.slice(0, 10));
  const [items, setItems] = useState(
    Array.from({ length: 10 }, (_, i) => i + 1),
  );

  const removeItem = () => {
    setItems((prevItems) => prevItems.slice(0, -1));
  };

  const moveContainer = () => {
    const chosenOption = getNthOption(currentIndex);

    if (chosenOption) {
      setTop(-chosenOption.offsetTop + 2);
    }
  };

  const setTop = (top: number) => {
    if (containerRef.current) {
      containerRef.current.style.top = `${top}px`;
    }
  };

  const getNthOption = (n: number): HTMLDivElement | null => {
    if (containerRef.current && containerRef.current.children.length > 0) {
      const options = Array.from(
        containerRef.current.children,
      ) as HTMLDivElement[];
      const nthOption = options.filter((_, index) => (index + 1) % n === 0)[0];

      return nthOption || null;
    }

    return null;
  };

  const getIndex = () => {
    if (currentIndex === options.length) {
      return 0;
    } else {
      return currentIndex + 2;
    }
  };

  const index = getIndex();

  const handleMouseOver = () => {
    if (!hovering) {
      setTimeout(() => setHovering(false), 1000);
      moveContainer();
      setCurrentIndex(index);
      setHovering(true);
    }
  };

  const addUser = () => {
    const newUserList = [...userList];

    newUserList.unshift(users[userList.length]);
    newUserList.pop();
    setUserList(newUserList);
  };

  return (
    <div style={{ position: "relative" }}>
      <section className={s.section} id={"display"}>
        <div
          className={s.container}
          id={"container"}
          onMouseOver={handleMouseOver}
          ref={containerRef}
        >
          {options.map((option, i) => (
            <div key={i}>
              <span>{option}</span>
            </div>
          ))}
        </div>
      </section>
      <div style={{ position: "absolute", top: "300px" }}>
        <ul className={s.gridContainer}>
          <AnimatePresence>
            {userList.map((user, index) => (
              <motion.li
                animate={{ opacity: 1, y: 0 }}
                className={s.gridItem}
                exit={{ opacity: 0, y: 50 }}
                initial={{ opacity: 1, y: -100 }}
                key={user}
                transition={{ duration: 0.5 }}
              >
                {user}
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        <button onClick={addUser} style={{ color: "aqua" }}>
          Add User
        </button>
      </div>
    </div>
  );
};

export default MyComponent;
