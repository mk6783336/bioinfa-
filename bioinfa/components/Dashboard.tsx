'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'

export default function Dashboard() {
  const { data: session } = useSession()
  const [recentSearches, setRecentSearches] = useState([])
  const [savedProteins, setSavedProteins] = useState([])

  useEffect(() => {
    // Fetch recent searches and saved proteins
    // This is a placeholder and should be replaced with actual API calls
    setRecentSearches(['Hemoglobin', 'Insulin', 'Collagen'])
    setSavedProteins(['P01308', 'P68871', 'P02452'])
  }, [])

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Welcome, {session?.user?.name}</h2>
      <div>
        <h3 className="text-xl font-semibold mb-2">Recent Searches</h3>
        <ul className="list-disc list-inside">
          {recentSearches.map((search, index) => (
            <li key={index}>{search}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Saved Proteins</h3>
        <ul className="list-disc list-inside">
          {savedProteins.map((protein, index) => (
            <li key={index}>{protein}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

