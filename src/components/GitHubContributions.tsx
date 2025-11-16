import React, { useState, useMemo, useEffect } from 'react'
import './GitHubContributions.css'

interface ContributionDay {
  date: Date
  count: number
  level: number
}

interface GitHubContributionsProps {
  username?: string
  totalContributions?: number
  monthsFont?: string
  contributionsFont?: string
  legendFont?: string
}

interface GitHubAPIContribution {
  date: string
  count: number
  level: number
}

const GitHubContributions: React.FC<GitHubContributionsProps> = ({
  username = 'EmilioGiordano',
  totalContributions,
  monthsFont = "'JetBrains Mono', monospace",
  contributionsFont = "'JetBrains Mono', monospace",
  legendFont = "'JetBrains Mono', monospace",
}) => {
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const [realContributions, setRealContributions] = useState<GitHubAPIContribution[] | null>(null)
  const [apiTotal, setApiTotal] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Obtener contribuciones reales de GitHub
  useEffect(() => {
    const fetchGitHubContributions = async () => {
      if (!username || username.trim() === '') {
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        const response = await fetch(`https://github-contributions-api.deno.dev/${username}.json`)
        const data = await response.json()
        
        // La API devuelve { contributions: [[semana1], [semana2], ...], totalContributions: 557 }
        // Cada semana es un array de 7 días
        if (data.contributions && Array.isArray(data.contributions)) {
          // Aplanar el array de semanas en un array de días
          const flatContributions = data.contributions.flat()
          setRealContributions(flatContributions)
          if (data.totalContributions) {
            setApiTotal(data.totalContributions)
          }
        }
      } catch (err) {
        console.error('Error:', err)
        setError('Error al cargar contribuciones')
      } finally {
        setIsLoading(false)
      }
    }

    fetchGitHubContributions()
  }, [username])

  // Generar datos de contribuciones (reales o ficticios)
  const contributionsData = useMemo(() => {
    const data: ContributionDay[] = []
    
    // Si tenemos datos reales de GitHub, usarlos
    if (realContributions && realContributions.length > 0) {
      realContributions.forEach((contribution: any) => {
        // La API usa contributionCount y contributionLevel
        const count = Number(contribution.contributionCount || contribution.count || 0)
        
        // Convertir contributionLevel string a número (NONE=0, FIRST_QUARTILE=1, etc.)
        let level = 0
        if (contribution.contributionLevel) {
          const levelMap: { [key: string]: number } = {
            'NONE': 0,
            'FIRST_QUARTILE': 1,
            'SECOND_QUARTILE': 2,
            'THIRD_QUARTILE': 3,
            'FOURTH_QUARTILE': 4
          }
          level = levelMap[contribution.contributionLevel] || 0
        } else {
          level = Number(contribution.level || 0)
        }
        
        data.push({
          date: new Date(contribution.date),
          count: count,
          level: level,
        })
      })
      return data
    }

    // Si no hay datos reales, generar datos ficticios para demo
    const today = new Date()
    const oneYearAgo = new Date(today)
    oneYearAgo.setFullYear(today.getFullYear() - 1)
    oneYearAgo.setDate(oneYearAgo.getDate() + 1)

    // Ajustar al domingo anterior
    const startDate = new Date(oneYearAgo)
    startDate.setDate(startDate.getDate() - startDate.getDay())

    let currentDate = new Date(startDate)
    
    while (currentDate <= today) {
      // Generar un número aleatorio de contribuciones (0-30)
      const count = Math.floor(Math.random() * 31)
      
      // Determinar el nivel de color (0-4)
      let level = 0
      if (count === 0) level = 0
      else if (count <= 3) level = 1
      else if (count <= 6) level = 2
      else if (count <= 9) level = 3
      else level = 4

      data.push({
        date: new Date(currentDate),
        count,
        level,
      })

      currentDate.setDate(currentDate.getDate() + 1)
    }

    return data
  }, [realContributions])

  // Calcular el total de contribuciones
  const calculatedTotal = useMemo(() => {
    if (totalContributions !== undefined) return totalContributions
    if (apiTotal !== null) return apiTotal
    return contributionsData.reduce((sum, day) => sum + day.count, 0)
  }, [contributionsData, totalContributions, apiTotal])

  // Organizar los datos en semanas
  const weeks = useMemo(() => {
    const weeksArray: ContributionDay[][] = []
    let currentWeek: ContributionDay[] = []

    contributionsData.forEach((day, index) => {
      currentWeek.push(day)
      
      if (day.date.getDay() === 6 || index === contributionsData.length - 1) {
        weeksArray.push([...currentWeek])
        currentWeek = []
      }
    })

    return weeksArray
  }, [contributionsData])

  // Obtener los meses para mostrar en el header
  const months = useMemo(() => {
    const monthsArray: { name: string; weekIndex: number }[] = []
    let lastMonth = -1

    weeks.forEach((week, weekIndex) => {
      const firstDay = week[0]
      const month = firstDay.date.getMonth()
      
      if (month !== lastMonth && weekIndex > 0) {
        const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
        monthsArray.push({
          name: monthNames[month],
          weekIndex,
        })
        lastMonth = month
      }
    })

    return monthsArray
  }, [weeks])

  // Obtener el nombre del día de la semana
  const getDayName = (dayIndex: number) => {
    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
    return days[dayIndex]
  }

  // Formatear la fecha para el tooltip
  const formatDate = (date: Date) => {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
    
    return `${days[date.getDay()]}, ${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`
  }

  const handleMouseEnter = (day: ContributionDay, event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    })
    setHoveredDay(day)
  }

  const handleMouseLeave = () => {
    setHoveredDay(null)
  }

  // Mostrar loading
  if (isLoading) {
    return (
      <div className="github-contributions">
        <div className="contributions-header" style={{ fontFamily: contributionsFont }}>
          Cargando contribuciones de {username}...
        </div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </div>
    )
  }

  // Mostrar error (pero seguir mostrando datos ficticios)
  if (error) {
    console.warn(error)
  }

  return (
    <div className="github-contributions">
      <div className="contributions-header" style={{ fontFamily: contributionsFont }}>
        {calculatedTotal.toLocaleString()} contribuciones en el último año
        {realContributions && username && (
          <span className="username-badge"> • @{username}</span>
        )}
      </div>

      <div className="contributions-graph">
        {/* Días de la semana */}
        <div className="days-labels">
          <div className="day-label"></div>
          <div className="day-label" style={{ fontFamily: monthsFont }}>Lun</div>
          <div className="day-label"></div>
          <div className="day-label" style={{ fontFamily: monthsFont }}>Mié</div>
          <div className="day-label"></div>
          <div className="day-label" style={{ fontFamily: monthsFont }}>Vie</div>
          <div className="day-label"></div>
        </div>

        <div className="graph-container">
          {/* Meses */}
          <div className="months-labels" style={{ fontFamily: monthsFont }}>
            {months.map((month, index) => (
              <div
                key={index}
                className="month-label"
                style={{ left: `${month.weekIndex * 14}px` }}
              >
                {month.name}
              </div>
            ))}
          </div>

          {/* Cuadrícula de contribuciones */}
          <div className="contributions-grid">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="week-column">
                {Array.from({ length: 7 }).map((_, dayIndex) => {
                  const day = week.find(d => d.date.getDay() === dayIndex)
                  
                  if (!day) {
                    return <div key={dayIndex} className="contribution-day empty" />
                  }

                  return (
                    <div
                      key={dayIndex}
                      className={`contribution-day level-${day.level}`}
                      onMouseEnter={(e) => handleMouseEnter(day, e)}
                      onMouseLeave={handleMouseLeave}
                      data-date={day.date.toISOString()}
                      data-count={day.count}
                    />
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leyenda */}
      <div className="contributions-legend" style={{ fontFamily: legendFont }}>
        <span>Menos</span>
        <div className="legend-colors">
          <div className="legend-box level-0" />
          <div className="legend-box level-1" />
          <div className="legend-box level-2" />
          <div className="legend-box level-3" />
          <div className="legend-box level-4" />
        </div>
        <span>Más</span>
      </div>

      {/* Tooltip */}
      {hoveredDay && (
        <div
          className="contribution-tooltip"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            fontFamily: contributionsFont,
          }}
        >
          <div className="tooltip-content">
            <strong>{hoveredDay.count} contribuciones</strong>
            <div>{formatDate(hoveredDay.date)}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GitHubContributions

