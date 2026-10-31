import { useState } from 'react'
import './SearchBar.css'
import { useEffect } from 'react'
import { useCallback } from 'react'

export const SearchBar = () => {

    const [searchInput, setSearchInput] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const sampleData = [
        {
            id: 1,
            title: 'React Official Documentation',
            url: 'https://reactjs.org/',
        },
        {
            id: 2,
            title: 'Mozilla Developer Network (MDN)',
            url: 'https://developer.mozilla.org/',
        },
        {
            id: 3,
            title: 'Stack Overflow',
            url: 'https://stackoverflow.com/',
        },
        {
            id: 4,
            title: 'GitHub',
            url: 'https://github.com/',
        },
        {
            id: 5,
            title: 'npm',
            url: 'https://www.npmjs.com/',
        },
    ]

    const debounce = (func, delay) => {
        let timeoutId
        return (...args) => {
            clearTimeout(timeoutId)
            timeoutId = setTimeout(() => func(...args), delay)
        }
    }

    const handleSearch = useCallback(
        debounce((term) => {
            if (term.trim() === '') {
                setSearchResults([])
            } else {
                const results = sampleData.filter((item) =>
                    item.title.toLowerCase().includes(term.toLowerCase()),
                )
                setSearchResults(results)
            }
        }, 300),
        [],
    )

    useEffect(() => {
        handleSearch(searchInput)

    }, [searchInput, handleSearch])

    const handleInputChange = (e) => {
        setSearchInput(e.target.value)
    }

    return (
        <div className="SearchBar">
            <form
                onSubmit={(e) => e.preventDefault()}
                className="SearchBar-form"
            >
                <div className="SearchBar-relative">
                    <input
                        type="text"
                        value={searchInput}
                        onChange={handleInputChange}
                        className="SearchBar-input"
                        placeholder="Search"
                    />
                    <div className="SearchBar-btns">
                        <button type="submit" className="SearchBar-btn">
                            {/* <Search size={20} />{' '} */}
                            aa
                        </button>{' '}
                        <button
                            type="button"
                            className="SearchBar-btn"
                            onClick={() =>
                                alert(
                                    'Voice search is unsupported in this demo.\nTry implementing this feature yourself 🙂',
                                )
                            }
                        >
                            {/* <Mic size={20} />{' '} */}
                        </button>{' '}
                    </div>{' '}
                </div>{' '}
            </form>{' '}
            {searchResults.length > 0 && (
                <div className="SearchBar-results">
                    <h2 className="SearchBar-h2"> Search Results: </h2>{' '}
                    <ul>
                        {' '}
                        {searchResults.map((result) => (
                            <li key={result.id} className="mb-2">
                                <a
                                    href={result.url}
                                    className="SearchBar-a"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {' '}
                                    {result.title}{' '}
                                </a>{' '}
                            </li>
                        ))}{' '}
                    </ul>{' '}
                </div>
            )}{' '}

        </div>
    )
}