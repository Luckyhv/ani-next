"use client"
import { AnimeInfoAnilist } from '@/lib/Anilistfunctions';
import { createContext, useState, useContext, useEffect } from 'react';
const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // const animeData = localStorage.getItem('AnimeDetails');
  // const consumetData = localStorage.getItem('ConsumetEpisodes')
  // const [animeDetails, setAnimeDetails] = useState(animeData ? JSON.parse(animeData) : null);
  // const [episodeData, setEpisodeData] = useState(consumetData ? JSON.parse(consumetData) : null);
  const [Isopen, setIsopen] = useState(false);
  const [dfprovider,setdfprovider] = useState(null);
  const [dfepisodes,setdfepisodes] = useState(null);
  const [dftype,setdftype] = useState(null);

  // const setAnimeInfo = (newData) => {
  //   setAnimeDetails(newData);
  // };
  
  const setEpisodes = (epdata) =>{
    // setEpisodeData(epdata);
  } 

  // const fetchAnimeDetails = async (id) => {
  //   try {
  //     const response = await AnimeInfoAnilist(id);
  //     setAnimeInfo(response);
  //     return response;
  //   } catch (error) {
  //     console.error("Error fetching Anime Details:", error);
  //     return null;
  //   }
  // };
  
  // const fetchConsumetEpisodes = async (id,status,refresh=false) => {
  //   try {
  //     const response = await fetch(
  //       `/api/episode/${id}?releasing=${status === "RELEASING" ? "true" : "false"}&refresh=${refresh}`
  //     );
  //     const data = await response.json();
  //     setEpisodes(data);
  //     return data;
  //   } catch (error) {
  //     console.error("Error fetching Consumet Episodes:", error);
  //   } 
  // }

// useEffect(() => {
  // localStorage.setItem('AnimeDetails', JSON.stringify(animeDetails));
  // localStorage.setItem('ConsumetEpisodes', JSON.stringify(episodeData));
  // const anifyimage = async()=>{
  //   const response = await axios.get(`https://api.anify.tv/info/${data.id}?fields=[bannerImage]`)
  //   setanifybanner(response.data.bannerImage);
  // }
  // anifyimage();
// }, [fetchConsumetEpisodes]);

  return (
    <DataContext.Provider value={{ Isopen, setIsopen,setdfprovider,setdfepisodes,dfepisodes,dfprovider, dftype,setdftype,
    //  fetchConsumetEpisodes
    //  ,fetchAnimeDetails, setAnimeInfo, animeDetails
     setEpisodes}}>
      {children}
    </DataContext.Provider>
  );
};

export function ContextSearch() {
  return useContext(DataContext);
}