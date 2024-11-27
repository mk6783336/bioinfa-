'use client'

import { useState } from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

const aminoAcids = [
  { symbol: 'A', name: 'Alanine', polarity: 'Nonpolar', hydrophobicity: 'Hydrophobic', molecularWeight: 89.09, color: 'red' },
  { symbol: 'R', name: 'Arginine', polarity: 'Polar', hydrophobicity: 'Hydrophilic', molecularWeight: 174.20, color: 'blue' },
  { symbol: 'N', name: 'Asparagine', polarity: 'Polar', hydrophobicity: 'Hydrophilic', molecularWeight: 132.12, color: 'green' },
  { symbol: 'D', name: 'Aspartic Acid', polarity: 'Polar', hydrophobicity: 'Hydrophilic', molecularWeight: 133.10, color: 'yellow' },
  { symbol: 'C', name: 'Cysteine', polarity: 'Nonpolar', hydrophobicity: 'Hydrophobic', molecularWeight: 121.16, color: 'orange' },
  { symbol: 'E', name: 'Glutamic Acid', polarity: 'Polar', hydrophobicity: 'Hydrophilic', molecularWeight: 147.13, color: 'purple' },
  { symbol: 'Q', name: 'Glutamine', polarity: 'Polar', hydrophobicity: 'Hydrophilic', molecularWeight: 146.15, color: 'pink' },
  { symbol: 'G', name: 'Glycine', polarity: 'Nonpolar', hydrophobicity: 'Hydrophobic', molecularWeight: 75.07, color: 'gray' },
  { symbol: 'H', name: 'Histidine', polarity: 'Polar', hydrophobicity: 'Hydrophilic', molecularWeight: 155.16, color: 'cyan' },
  { symbol: 'I', name: 'Isoleucine', polarity: 'Nonpolar', hydrophobicity: 'Hydrophobic', molecularWeight: 131.17, color: 'lightgreen' },
  { symbol: 'L', name: 'Leucine', polarity: 'Nonpolar', hydrophobicity: 'Hydrophobic', molecularWeight: 131.17, color: 'lightblue' },
  { symbol: 'K', name: 'Lysine', polarity: 'Polar', hydrophobicity: 'Hydrophilic', molecularWeight: 146.19, color: 'magenta' },
  { symbol: 'M', name: 'Methionine', polarity: 'Nonpolar', hydrophobicity: 'Hydrophobic', molecularWeight: 149.21, color: 'brown' },
  { symbol: 'F', name: 'Phenylalanine', polarity: 'Nonpolar', hydrophobicity: 'Hydrophobic', molecularWeight: 165.19, color: 'darkred' },
  { symbol: 'P', name: 'Proline', polarity: 'Nonpolar', hydrophobicity: 'Hydrophobic', molecularWeight: 115.13, color: 'darkgreen' },
  { symbol: 'S', name: 'Serine', polarity: 'Polar', hydrophobicity: 'Hydrophilic', molecularWeight: 105.09, color: 'darkblue' },
  { symbol: 'T', name: 'Threonine', polarity: 'Polar', hydrophobicity: 'Hydrophilic', molecularWeight: 119.12, color: 'darkcyan' },
  { symbol: 'W', name: 'Tryptophan', polarity: 'Nonpolar', hydrophobicity: 'Hydrophobic', molecularWeight: 204.23, color: 'darkorange' },
  { symbol: 'Y', name: 'Tyrosine', polarity: 'Polar', hydrophobicity: 'Hydrophilic', molecularWeight: 181.19, color: 'darkviolet' },
  { symbol: 'V', name: 'Valine', polarity: 'Nonpolar', hydrophobicity: 'Hydrophobic', molecularWeight: 117.15, color: 'darkkhaki' },
]

function AminoAcidModel({ color }: { color: string }) {
  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

const AminoAcidExplorer = () => {
  const [selectedAminoAcid, setSelectedAminoAcid] = useState<any>(null)

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">Amino Acid Explorer</h2>
      <div className="grid grid-cols-5 gap-2 mb-4">
        {aminoAcids.map((aa) => (
          <button
            key={aa.symbol}
            className={`p-2 border rounded ${selectedAminoAcid?.symbol === aa.symbol ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
            onClick={() => setSelectedAminoAcid(aa)}
          >
            {aa.symbol}
          </button>
        ))}
      </div>
      {selectedAminoAcid && (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="text-xl font-bold">{selectedAminoAcid.name} ({selectedAminoAcid.symbol})</h3>
            <p><strong>Polarity:</strong> {selectedAminoAcid.polarity}</p>
            <p><strong>Hydrophobicity:</strong> {selectedAminoAcid.hydrophobicity}</p>
            <p><strong>Molecular Weight:</strong> {selectedAminoAcid.molecularWeight} g/mol</p>
          </div>
          <div className="h-64">
            <Canvas>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <AminoAcidModel color={selectedAminoAcid.color} />
              <OrbitControls />
            </Canvas>
          </div>
        </div>
      )}
    </div>
  )
}

export default AminoAcidExplorer

