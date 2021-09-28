import Styles from './item-styles.scss'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { Calendar, Icon } from '@/presentation/components'
import { Link } from 'react-router-dom'
import React from 'react'

type Props = {
  survey: LoadSurveyList.Model
}

const SurveyItem: React.FC<Props> = ({ survey }: Props) => {
  const iconName = survey.didAnswer ? 'thumbUp' : 'thumbDown'

  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Icon className={Styles.iconWrap} iconName={iconName} />
        <Calendar date={survey.date} className={Styles.calendarWrap} />
        <p data-testid="question">{survey.question}</p>
      </div>
      <footer><Link data-testid="link" to={`/surveys/${survey.id}`}></Link></footer>
    </li>
  )
}

export default SurveyItem
