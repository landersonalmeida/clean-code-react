import Styles from './survey-result-styles.scss'
import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases'
import { Header, Loading, Footer, Error } from '@/presentation/components'
import { SurveyResultData, surveyResultState, onSurveyAnswerState } from '@/presentation/pages/survey-result/components'
import { useErrorHandler } from '@/presentation/hooks'
import { useRecoilState, useSetRecoilState } from 'recoil'
import React, { useEffect } from 'react'

type Props = {
  loadSurveyResult: LoadSurveyResult
  saveSurveyResult: SaveSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult, saveSurveyResult }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, surveyResult: null!, isLoading: false, error: error.message }))
  })

  const [state, setState] = useRecoilState(surveyResultState)

  const reload = (): void => setState(old => ({ isLoading: false, surveyResult: null!, error: '', reload: !old.reload }))

  const setOnAnswer = useSetRecoilState(onSurveyAnswerState)

  const onAnswer = (answer: string): void => {
    if (state.isLoading) return
    setState(old => ({ ...old, isLoading: true }))
    saveSurveyResult.save({ answer })
      .then(surveyResult => setState(old => ({ ...old, isLoading: false, surveyResult })))
      .catch(handleError)
  }

  useEffect(() => {
    loadSurveyResult.load()
      .then(surveyResult => setState(old => ({ ...old, surveyResult })))
      .catch(handleError)
  }, [state.reload])

  useEffect(() => {
    setOnAnswer({ onAnswer })
  }, [])

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div data-testid="survey-result" className={Styles.contentWrap}>
        {state.surveyResult && <SurveyResultData surveyResult={state.surveyResult} />}
        {state.isLoading && <Loading />}
        {state.error && <Error error={state.error} reload={reload} />}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyResult
