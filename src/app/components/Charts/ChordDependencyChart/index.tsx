import React, {useEffect, useRef} from 'react'
import './styles.css'
import {createChart} from './chordDependencyHelper';
import {CircleDiagramContainer} from "./styles";


function ChordDependencyChart({ data }: { data: any }) {
  const containerRef = useRef(null)

  useEffect(function () {
    const el = createChart({ data })
    console.log('call')
    containerRef?.current?.appendChild(el)
  }, [])

  return (
    <CircleDiagramContainer ref={containerRef}>

    </CircleDiagramContainer>
  )
}

export default ChordDependencyChart