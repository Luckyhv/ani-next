"use client";
import React, { useEffect, useState } from 'react';
import styles from '../../styles/Herosection.module.css';
import Link from 'next/link';

function Herosection({ data }) {
  const [trailer, setTrailer] = useState(null);
  data=data[0]

  useEffect(() => {
    async function fetchTrailer() {
      try {
        const response = await fetch(
          `https://invidious.lunar.icu/api/v1/videos/${data.trailer.id}?fields=adaptiveFormats&pretty=1`
        );
        const res = await response.json();
        const item = res.adaptiveFormats.find((i) => i.resolution === '1080p' && i.type === 'video/webm');
        setTrailer(item.url);
        console.log(item.url);
      } catch (error) {
        console.error('Error fetching trailer:', error);
      }
    }

    if (data && data.trailer) {
      fetchTrailer();
    }
  }, [data]);

  return (
    <div className={styles.herosection}>
      
    </div>
  );
}

export default Herosection;
