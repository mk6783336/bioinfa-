'use client'

import { useEffect, useRef, useState } from 'react'
import * as $3Dmol from '3dmol'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface ProteinViewerProps {
  initialPdbId?: string
}

const ProteinViewer: React.FC<ProteinViewerProps> = ({ initialPdbId = '1BNA' }) => {
  const viewerRef = useRef<HTMLDivElement>(null)
  const [viewer, setViewer] = useState<any>(null)
  const [pdbId, setPdbId] = useState(initialPdbId)

  useEffect(() => {
    if (!viewerRef.current) return

    const v = $3Dmol.createViewer(viewerRef.current, {
      backgroundColor: 'white'
    })

    setViewer(v)

    return () => {
      v.clear()
    }
  }, [])

  useEffect(() => {
    if (!viewer) return

    viewer.clear()
    $3Dmol.download(`pdb:${pdbId}`, viewer, {}, function() {
      viewer.setStyle({}, { cartoon: { color: 'spectrum' } })
      viewer.zoomTo()
      viewer.render()
    })
  }, [viewer, pdbId])

  const handleRotate = () => {
    if (viewer) {
      viewer.rotate(30, { x: 1, y: 1, z: 0 })
      viewer.render()
    }
  }

  const handleZoomIn = () => {
    if (viewer) {
      viewer.zoom(0.5)
      viewer.render()
    }
  }

  const handleZoomOut = () => {
    if (viewer) {
      viewer.zoom(-0.5)
      viewer.render()
    }
  }

  const handlePdbIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPdbId(e.target.value)
  }

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          type="text"
          value={pdbId}
          onChange={handlePdbIdChange}
          placeholder="Enter PDB ID"
        />
        <Button onClick={() => setPdbId(pdbId)}>Load</Button>
      </div>
      <div ref={viewerRef} style={{ width: '100%', height: '400px' }} />
      <div className="flex space-x-2">
        <Button onClick={handleRotate}>Rotate</Button>
        <Button onClick={handleZoomIn}>Zoom In</Button>
        <Button onClick={handleZoomOut}>Zoom Out</Button>
      </div>
    </div>
  )
}

export default ProteinViewer

