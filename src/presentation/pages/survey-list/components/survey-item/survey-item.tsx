import { Icon } from '@/presentation/components'
import React from 'react'
import Styles from './survey-item-styles.scss'

const SurveyItem: React.FC = () => {
  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Icon className={Styles.iconWrap} iconName={'thumbUp'} />
        <time>
          <span className={Styles.day}>08</span>
          <span className={Styles.month}>08</span>
          <span className={Styles.year}>2021</span>
        </time>
        <p>Qual é seu framework web favorito?</p>
      </div>
      <footer>Ver Resultado</footer>
    </li>
  )
}

export default SurveyItem
