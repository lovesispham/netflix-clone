import genres from "../assets/data/genres";
import genrestv from "../assets/data/genrestv";

 const useGenreConvert = genreIds => {
    const mergeGenresList = genres.concat(genrestv.filter(e=> !genres.find(b=>b.id === e.id)))
    

    const newGenresList = []

    genreIds?.slice(0,3).map(genreId => 
        mergeGenresList
        .filter(el => el.id === genreId)
        .map(el => newGenresList.push(el.name)) 
        )

    return newGenresList
}
export default useGenreConvert