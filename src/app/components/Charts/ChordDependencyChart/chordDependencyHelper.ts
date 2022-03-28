import * as d3 from "d3";

export function createChart({ data }: { data: any[] }) {
  const width = 600
  const height = 600
  const innerRadius = Math.min(width, height) * 0.5 - 90
  const outerRadius = innerRadius + 10
  const names = Array.from(new Set(data.flatMap(d => [d.source, d.target]))).sort(d3.ascending)
  //const color = d3.scaleOrdinal(names, d3.quantize(d3.interpolateHcl("#0AFADB", "#5C02DB"), names.length))

  const ribbon = d3.ribbonArrow()
    .radius(innerRadius - 1)
    .padAngle(1 / innerRadius)

  const arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)

  const chord = d3.chordDirected()
    .padAngle(10 / innerRadius)
    .sortSubgroups(d3.descending)
    .sortChords(d3.descending)

  const matrix = getMatrix(names, data)

  const tooltip = d3.select('body')
    .append('div')
    .attr('class', 'chord-line-tooltip')

  function handleMouseOver(e) {
    const data = e.target.__data__
    tooltip.style('opacity', 1).text(`${names[data.source.index]} → ${names[data.target.index]} ${data.source.value}`)
  }

  function handleMouseMove(e) {
    tooltip
      .style('transform', `translate3d(${e.pageX + 10}px, ${e.pageY + 10}px, 0)`)
  }

  function handleMouseOut() {
    tooltip.style('opacity', 0)
  }

  const svg = d3.create("svg")
    .attr("viewBox", [-width / 2, -height / 2, width, height]);

  const chords = chord(matrix);

  const group = svg.append("g")
    .attr("font-size", 10)
    .attr("font-family", "sans-serif")
    .attr("font-weight", "500")
    .selectAll("g")
    .data(chords.groups)
    .join("g");

  group.append("path")
    .attr("fill", '#E9EFF9')
    .attr("d", arc);

  group.append("text")
    .each(d => (d.angle = (d.startAngle + d.endAngle) / 2))
    .attr("dy", "0.35em")
    .attr('font-family', `'DMSans', sans-serif`)
    .attr('fill', `#05143A`)
    .attr("transform", d => `
        rotate(${(d.angle * 180 / Math.PI - 90)})
        translate(${outerRadius + 5})
        ${d.angle > Math.PI ? "rotate(180)" : ""}
      `)
    .attr("text-anchor", d => d.angle > Math.PI ? "end" : null)
    .text(d => names[d.index]);

  group.append("title")
    .text((d) => `${names[d.index]}
${d3.sum(chords, (c) => (c.source.index === d.index ? 1: 0) * c.source.value)} outgoing →
${d3.sum(chords, (c) => (c.target.index === d.index ? 1 : 0) * c.source.value)} incoming ←`);

  svg.append("g")
    .selectAll("path")
    .data(chords)
    .join("path")
    .style("mix-blend-mode", "multiply")
    .attr('class', 'chord-line')
    .attr("fill", '#2C82C9')
    .attr("d", ribbon)
    .on('mouseover', handleMouseOver)
    .on('mousemove', handleMouseMove)
    .on('mouseout', handleMouseOut)
    .append("title")
    .text(d => `${names[d.source.index]} → ${names[d.target.index]} ${d.source.value}`);

  return svg.node();

}

function getMatrix(names, data) {
  const index: Map<string, number> = new Map(names.map((name, i) => [name, i]));
  const matrix = Array.from(index, () => new Array(names.length).fill(0));

  for (const {source, target, value} of data)
    matrix[index.get(source)][index.get(target)] += value

  return matrix;
}

export function processData(sourceData: any) {
  const data = []

  for (const item of sourceData.bytesBetweenSegments) {
    for (const targetSegment of item.bytesToDestSegments) {
      data.push({
        source: item.sourceSegment.segmentName,
        target: targetSegment.segmentInfo.segmentName,
        value: targetSegment.bytes
      })
    }
  }

  return data
}

export function getMockData() {
  return {
    "bytesBetweenSegments": [
      {
        "sourceSegment": {
          "segmentId": "6233712045f669cec411e607",
          "segmentName": "HRMS App"
        },
        "bytesToDestSegments": [
          {
            "segmentInfo": {
              "segmentId": "6233715445f669cec411e608",
              "segmentName": "HRMS Client"
            },
            "bytes": "2885"
          }
        ]
      },
      {
        "sourceSegment": {
          "segmentId": "6233715445f669cec411e608",
          "segmentName": "HRMS Client"
        },
        "bytesToDestSegments": [
          {
            "segmentInfo": {
              "segmentId": "6233712045f669cec411e607",
              "segmentName": "HRMS App"
            },
            "bytes": "9312"
          }
        ]
      },
      {
        "sourceSegment": {
          "segmentId": "6233715445f669cec411e608",
          "segmentName": "HRMS Client"
        },
        "bytesToDestSegments": [
          {
            "segmentInfo": {
              "segmentId": "6233712045f669cec411e607",
              "segmentName": "HRMS App 2"
            },
            "bytes": "9000"
          },
          {
            "segmentInfo": {
              "segmentId": "6233712045f669cec411e607",
              "segmentName": "HRMS App 3"
            },
            "bytes": "920"
          }
        ]
      },
      {
        "sourceSegment": {
          "segmentId": "6233715445f669cec411e608",
          "segmentName": "HRMS App 2"
        },
        "bytesToDestSegments": [
          {
            "segmentInfo": {
              "segmentId": "6233712045f669cec411e607",
              "segmentName": "HRMS Client"
            },
            "bytes": "10000"
          },
        ]
      }
    ]
  }
}