import SequenceAligner from '@/components/SequenceAligner'

export default function AlignmentPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Sequence Alignment Tool</h1>
      <SequenceAligner />
    </div>
  )
}

