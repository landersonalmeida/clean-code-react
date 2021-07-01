import { SurveyModel } from '../models'

export interface LoadSurveyList {
  loadAll: () => Promise<SurveyModel>
}
