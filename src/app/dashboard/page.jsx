// import React from 'react'
"use client";

import { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import useSWR from "swr";
import { useSession } from "next-auth/react";

const dashboard = () => {

  // const [data, setData] = useState([]);
  // const [err, setErr] = useState(false)
  // const [isLoading, setIsLoading] = useState(false);
  
  // useEffect(() => {
  //   const getData = async () => {
  //     setIsLoading(true);
  //     const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
  //       cache: "no-cache",
  //     });

  //     if (!res.ok) {
  //       setErr(true);
  //     }
      
  //     const data = await res.json();

  //     setData(data);
  //     setIsLoading(false);
      
  //   };
  //   getData();
  // }, []);

  const session = useSession();

  console.log(session);

  const fetcher = (...args) => fetch(...args).then(res => res.json())

  const { data, error, isLoading } = useSWR ("https://jsonplaceholder.typicode.com/posts", fetcher)
  
  if (error) return <div>Failed to load</div>
  if (isLoading) return <div>please wait....</div>

  // console.log('data=', data);
  
  return (
    <div className={styles.title}>
      dashboard
    </div>
  )
    
};

export default dashboard;
