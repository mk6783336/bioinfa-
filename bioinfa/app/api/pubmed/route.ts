import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/'
  const searchTerm = 'bioinformatics'
  const retMax = 10

  try {
    // First, search for article IDs
    const searchResponse = await fetch(`${baseUrl}esearch.fcgi?db=pubmed&term=${searchTerm}&retmax=${retMax}&retmode=json`)
    const searchData = await searchResponse.json()
    const ids = searchData.esearchresult.idlist

    // Then, fetch details for these IDs
    const summaryResponse = await fetch(`${baseUrl}esummary.fcgi?db=pubmed&id=${ids.join(',')}&retmode=json`)
    const summaryData = await summaryResponse.json()

    const articles = ids.map((id: string) => {
      const article = summaryData.result[id]
      return {
        id: id,
        title: article.title,
        authors: article.authors.map((author: any) => author.name),
        journal: article.fulljournalname,
        pubDate: article.pubdate,
      }
    })

    return NextResponse.json(articles)
  } catch (error) {
    console.error('Error fetching PubMed articles:', error)
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 })
  }
}

