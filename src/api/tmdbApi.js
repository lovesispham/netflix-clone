import axiosClient from './axiosClient'

export const category = {
    movie:'movie',
    tv:'tv'
}

export const movieType = {
    upcoming:'upcoming',
    popular :'popular',
    now_playing:'now_playing',
    top_rated:'top_rated'
}

export const tvType = {
    airing_today:'airing_today',
    on_the_air:'on_the_air',
    popular:'popular',
    top_rated:'top_rated'
}

const tmdbApi = {
    getMoviesList:(type,params) => {
        const url = 'movie/' + movieType[type]
        return axiosClient.get(url, params);
        
    },
    getTvList:(type,params) => {
        const url ='tv/' + tvType[type]
        return axiosClient.get(url,params)
    },
    detail:(cate,id) => {
        const url = category[cate] + '/' + id
        return axiosClient.get(url,{params:{}})
    },
    getVideos:(cate,id) => {
        const url = category[cate] + '/'+ id + '/videos?'
        return axiosClient.get(url, {params: {}})
    },
    credits:(cate,id) => {
        const url = category[cate] + '/' + id + '/credits?'
        return axiosClient.get(url,{params:{}})
    },
    similar:(cate,id) => {
        const url = category[cate] + '/' + id + '/similar?'
        return axiosClient.get(url,{params:{}})
    },
    getByGenre:(cate, params) => {
        const url = 'discover/' + category[cate]
        return axiosClient.get(url,params)
    },
    search:(params) => {
        const url = 'search/multi?'
        return axiosClient.get(url,params)
    }
}

export default tmdbApi