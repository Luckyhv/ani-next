import axios from 'axios';
import { redis } from '@/lib/rediscache';
import { NextResponse } from "next/server"

async function fetchConsumetEpisodes(id) {
  try {
    async function fetchData(dub) {
      const { data } = await axios.get(
        `https://consumet-anime-api.vercel.app/meta/anilist/episodes/${id}${dub ? "?dub=true" : ""}`
      );
      if (data?.message === "Anime not found" && data?.length < 1) {
        return [];
      }

      return data;
    }

    const [subData, dubData] = await Promise.all([
      fetchData(),
      fetchData(true),
    ]);

    const array = [
      {
        consumet:true,
        providerId: "gogoanime",
        episodes: {
          sub: subData,
          dub: dubData,
        },
      },
    ];

    return array;
  } catch (error) {
    console.error("Error fetching and processing data:", error.message);
    return [];
  }
}

async function fetchAnifyEpisodes(id) {
  try {
    const { data } = await axios.get(`https://api.anify.tv/episodes/${id}`);

    if (!data) {
      return [];
    }

    const filtereddata = data.filter((episodes) => episodes.providerId !== "9anime");
    return filtereddata;
  } catch (error) {
    console.error("Error fetching and processing data:", error.message);
    return [];
  }
}

async function fetchEpisodeImages(id, available = false) {
  try {
    if (available) {
      return null;
    }
    const { data } = await axios.get(
      `https://api.anify.tv/content-metadata/${id}`
    );

    if (data && data[0] && data[0].data) {
      return data[0].data;
    }
    return [];
  } catch (error) {
    console.error("Error fetching and processing data:", error.message);
    return [];
  }
}

export const GET = async (req, { params }) => {
  const url = new URL(req.url);
  const id = params.animeid[0];
  const releasing = url.searchParams.get('releasing') || false;
  const dub = url.searchParams.get('dub') || true;
  const refresh = url.searchParams.get('refresh') === 'true' || false;

  let cacheTime = null;
  if (releasing === "true") {
    cacheTime = 60 * 60 * 2; 
  } else if (releasing === "false") {
    cacheTime = 60 * 60 * 24 * 30;
  }

  let metaData;
  let meta;
  let cached;

  if (refresh) {
    await redis.del(`episode:${id}`);
    console.log("deleted cache");
  } else {
    cached = await redis.get(`episode:${id}`);
    console.log("using redis");
  }
  // meta = await redis.get(`meta:${id}`);

  if (cached) {
    // If data is found in the cache, return it
    const cachedData = JSON.parse(cached);
    // if (meta) {
    //   metaData = await CombineEpisodeMeta(cachedData, JSON.parse(meta));
    // }
    return NextResponse.json(cachedData);
  } else {

    const [consumet, anify] = await Promise.all([
      fetchConsumetEpisodes(id),
      fetchAnifyEpisodes(id),
      // fetchEpisodeImages(id, meta),
    ]);

    // if (data && data.length > 0) {
      // }
      // return NextResponse.json(data);
      
      const combinedData = [...consumet, ...anify];
      await redis.setex(`episode:${id}`, cacheTime, JSON.stringify(combinedData));
    // let data;

    // if (meta) {
    //   data = await CombineEpisodeMeta(combinedData, JSON.parse(meta));
    // } else if (cover && !cover.some((e) => e.img === null)) {
    //   if (redis) await redis.set(`meta:${id}`, JSON.stringify(cover));
    //   data = await CombineEpisodeMeta(combinedData, cover);
    // }

    // Cache the fetched data in Redis

    return NextResponse.json(combinedData);
  }
};

