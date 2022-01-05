import PropTypes from "prop-types"
import {useState,useRef} from 'react'
import {useHistory} from 'react-router-dom'
import useOutsideClick from './useOutsideClick'


 function SearchBar(props) {
     const history = useHistory()

    const [searchToggle, setSearchToggle] = useState(false)
     const [keyword, setKeyWord] = useState(props.keyword ? props.keyword : '')
    const searchbarRef = useRef()
    const searchInputRef = useRef()


    useOutsideClick(searchbarRef,()=> {
        if(searchToggle){
            setKeyWord("")
            setSearchToggle(false)
        }
    })

    const handleSearchToggle = () => {
        searchInputRef.current.focus()
        setSearchToggle(!searchToggle)
    }

    const clearSearchToggle = () => {
        setKeyWord("")
        history.push("/")
    }


     const handleSearchInput = event => {
        const {value} = event.target
        setKeyWord(value)
        console.log(value)
        if(value.length > 0){
            history.push(`/search/${value}`)
        } else
            history.push("/")
     }
     

    return (
        <div className="search-bar" ref={searchbarRef}>
            <input 
                type="text"
                placeholder="Search movies and tv shows"
                value={keyword}
                onChange={handleSearchInput}
                ref={searchInputRef}
                className={`form-control ${searchToggle && 'active'}`}
            />
            
            {
                !searchToggle ? (
                    <span className="btn btn-search" onClick={handleSearchToggle}><i className="fa fa-search"></i></span>
                ): null
            }
            <div onClick={clearSearchToggle}></div>
        </div>
    )
}

SearchBar.propTypes = {
  keyword: PropTypes.string
}
export default SearchBar