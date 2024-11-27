'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSearch = () => {
    router.push(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <div className="flex space-x-2">
      <Input
        type="text"
        placeholder="Search protein..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <Button onClick={handleSearch}>Search</Button>
    </div>
  )
}

export default SearchBar

