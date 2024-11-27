'use client'

import { useParams } from 'next/navigation'
import ProteinViewer from '@/components/ProteinViewer'

export default function ViewerPage() {
  const { pdbId } = useParams()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Protein Viewer: {pdbId}</h1>
      {pdbId && <ProteinViewer pdbId={pdbId as string} />}
    </div>
  )
}

