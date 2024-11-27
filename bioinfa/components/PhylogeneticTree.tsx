'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

interface TreeNode {
  name: string
  children?: TreeNode[]
}

interface PhylogeneticTreeProps {
  treeData: TreeNode
}

const PhylogeneticTree: React.FC<PhylogeneticTreeProps> = ({ treeData }) => {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const width = 600
    const height = 400
    const margin = { top: 20, right: 90, bottom: 30, left: 90 }

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    const tree = d3.tree<TreeNode>().size([height, width - 200])

    const root = d3.hierarchy(treeData)
    tree(root)

    const link = svg.selectAll('.link')
      .data(root.links())
      .enter().append('path')
      .attr('class', 'link')
      .attr('d', d3.linkHorizontal<d3.HierarchyPointLink<TreeNode>, d3.HierarchyPointNode<TreeNode>>()
        .x(d => d.y)
        .y(d => d.x))
      .style('fill', 'none')
      .style('stroke', '#ccc')
      .style('stroke-width', '2px')

    const node = svg.selectAll('.node')
      .data(root.descendants())
      .enter().append('g')
      .attr('class', d => 'node' + (d.children ? ' node--internal' : ' node--leaf'))
      .attr('transform', d => `translate(${d.y},${d.x})`)

    node.append('circle')
      .attr('r', 10)
      .style('fill', '#69b3a2')

    node.append('text')
      .attr('dy', '.35em')
      .attr('x', d => d.children ? -13 : 13)
      .style('text-anchor', d => d.children ? 'end' : 'start')
      .text(d => d.data.name)

  }, [treeData])

  return <svg ref={svgRef}></svg>
}

export default PhylogeneticTree

