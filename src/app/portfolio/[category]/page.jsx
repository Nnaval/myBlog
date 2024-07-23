import React from "react";
import styles from "./category.module.css";
import Button from "@/components/button/Button";
import Image from "next/image";

const Category = ({ params }) => {
  console.log(params);
  return (
    <div className={styles.container}>
      <h1 className={styles.catTitle}>{params.category}</h1>
      <div className={styles.item}>
        <div className={styles.content}>
          <h1 className={styles.title}> Test</h1>
          <p className={styles.desc}>Desc</p>
          <Button text="SEE MORE" url="#" />
        </div>
        <div className={styles.imgContainer}>
          <Image
          fill={true}
            className={styles.img}
            src="/hero.png"
            alt="image of a hosue"
          />
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.content}>
          <h1 className={styles.title}> Test</h1>
          <p className={styles.desc}>Desc</p>
          <Button text="SEE MORE" url="#" />
        </div>
        <div className={styles.imgContainer}>
          <Image
          fill={true}
            className={styles.img}
            src="/hero.png"
            alt="image of a hosue"
          />
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.content}>
          <h1 className={styles.title}> Test</h1>
          <p className={styles.desc}>Desc</p>
          <Button text="SEE MORE" url="#" />
        </div>
        <div className={styles.imgContainer}>
          <Image
          fill={true}
            className={styles.img}
            src="/hero.png"
            alt="image of a hosue"
          />
        </div>
      </div>
    </div>
  );
};

export default Category;
