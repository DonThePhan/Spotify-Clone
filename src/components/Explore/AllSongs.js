import { useContext } from "react"
import MusicContext from "../Store/music-context"
import { initialMusic } from "../Store/music-context"
import SongCard from "./SongCard"

export default function AllSongs() {
    console.log(initialMusic)
    return initialMusic.map(song => {return <SongCard key={song.title} song={song}></SongCard>})
}