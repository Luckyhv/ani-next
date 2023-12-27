"use client";
import React, { useEffect, useState } from 'react';
import styles from '../../styles/Herosection.module.css';
import Link from 'next/link';

function Herosection({ data }) {
  const [trailer, setTrailer] = useState(null);
  data=data[1]

  useEffect(() => {
    async function fetchTrailer() {
      try {
        const response = await fetch(
          `https://yt.drgnz.club/api/v1/videos/${data.trailer.id}?fields=adaptiveFormats&pretty=1`
        );
        const res = await response.json();
        const item = res.formatStreams.find((i) => i.resolution === '720p');
        setTrailer(item.url);
        console.log(item.url);
      } catch (error) {
        console.error('Error fetching trailer:', error);
      }
    }

    if (data && data.trailer) {
      // fetchTrailer();
    }
  }, [data]);

  return (
    <div className={styles.herosection}>
      {/* {trailer && (
      )} */}
      {/* <video src="https://pipedproxy-cwl.kavin.rocks/videoplayback?c=ANDROID&amp;clen=6712565&amp;cpn=VJlWH88RyH0znoKU&amp;dur=50.049&amp;ei=FoWLZYGsDcW5vdIP7KeYgAE&amp;expire=1703663990&amp;fexp=24007246&amp;fvip=4&amp;gir=yes&amp;host=rr3---sn-aigl6ned.googlevideo.com&amp;id=o-APR4Li5hhoK7v7rtEibm7NwaBw_WIgj1wZWO-C4AYQ1N&amp;initcwndbps=2043750&amp;ip=138.199.29.176&amp;itag=137&amp;keepalive=yes&amp;lmt=1635694404243844&amp;lsig=AAO5W4owRAIgL2ngmEG23beFNTTr03J6nXmDqtm-T2szCcK8Yt1RpqYCIFFCHvEnj2PGBZQm1t_bddKfzK2zKyH4ooOsUUaWZxKY&amp;lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&amp;mh=4d&amp;mime=video%2Fmp4&amp;mm=31%2C29&amp;mn=sn-aigl6ned%2Csn-aigzrn7e&amp;ms=au%2Crdu&amp;mt=1703642229&amp;mv=m&amp;mvi=3&amp;pl=24&amp;qhash=2b00b52a&amp;requiressl=yes&amp;sig=AJfQdSswRAIgQS4YnTJK1QTwYOpJW0bkoIc2w2XjhGqFrQ5qHFNfyb0CIDtlscTBpvoHcnotTJ6Mkq8C4fC5v2Ya7sEq3Nu0f5A1&amp;source=youtube&amp;sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&amp;spc=UWF9f6Jz_VnKWMyxSpVZnck9Sn6MJDo&amp;svpuc=1&amp;txp=5535434&amp;ump=1&amp;vprv=1&amp;xpc=EgVo2aDSNQ%3D%3D" preload="auto" autoplay="" ></video> */}
    </div>
  );
}

export default Herosection;
