import React from 'react'

const Search = () => {
  return (
    <div className='ml-4'>
        <div className="absolute pointer-events-auto ...">
            <svg className="absolute text-slate-400 h-5 w-5 ml-3 mt-2" viewBox="0 -2 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
        </div>
        <input type="text" placeholder="Search" className="pl-10 h-10 bg-cryptoblue-200 rounded-xl" />
</div>
  )
}

export default Search
