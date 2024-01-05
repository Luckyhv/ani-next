"use client"

import React, { useEffect, useState } from 'react';
import styles from '../../styles/Herosection.module.css';
import Animecard from '../Animecard';

function Herosection({ data }) {
  const [trailer, setTrailer] = useState(null);
  const [populardata, setpopulardata] = useState(null);
  const [videoEnded, setVideoEnded] = useState(false);

  useEffect(() => {
    const getPopular = () => {
      if (data && Array.isArray(data) && data.length > 0) {
        const filteredData = data.filter(item => item.trailer && item.trailer.id && item.id !== 21 && item.bannerImage!==null);
        const randomIndex = Math.floor(Math.random() * filteredData.length);
        setpopulardata(filteredData[randomIndex]);
      }
    };
    getPopular();
  }, [data]);

  useEffect(() => {
    async function fetchTrailer(trailerId) {
      try {
        if (trailerId) {
          const response = await fetch(
            `https://pipedapi.kavin.rocks/streams/${trailerId}`
          );
          const res = await response.json();
          const item = res.videoStreams.find(
            (i) => i.quality === '1080p' && i.format === 'WEBM'
          );
          setTrailer(item.url);
        }
      } catch (error) {
        console.error('Error fetching trailer:', error);
      }
    }

    if (populardata && populardata.trailer) {
      fetchTrailer(populardata.trailer.id);
    }
  }, [populardata]);

  const handleVideoEnded = () => {
    setVideoEnded(true);
  };

  const handleVideoError = () => {
    setVideoEnded(true);
  };

  return (
    <div className={`${styles.herosection}`}>
      <div className={styles.herogradient}></div>
      {trailer && !videoEnded ? (
        <span className={styles.heroimgcon}>
          <video
            src={trailer}
            preload="auto"
            autoPlay
            className={styles.herovideo}
            onEnded={handleVideoEnded}
            onError={handleVideoError}
          ></video>
        </span>
      ) : (
        <span className={styles.heroimgcon}>
          <img src={populardata?.bannerImage} alt="" className={styles.heroimg} />
        </span>
      )}
      <div className={styles.herotrending}>
        <Animecard data={data} cardid="Trending Now" />
      </div>
    </div>
  );
}

export default Herosection;
