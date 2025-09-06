import * as qandaRepository from './qandaRepository.js';
import * as locationPostRepository from '../locationPost/locationPostRepository.js';
import { httpError } from '../../utils/httpError.js';

export const askQuestion = async (locationPostId, userId, questionText, req, next) => {
  const locationPost = await locationPostRepository.findLocationPostById(locationPostId);
  if (!locationPost) {
    return httpError(next, new Error('Location post not found'), req, 404);
  }

  const questionData = {
    locationPost: locationPostId,
    question: {
      text: questionText,
      askedBy: userId || '687926380911cf24d2eedf07'
    },
    answers: []
  };

  return qandaRepository.createQuestion(questionData);
};

export const answerQuestion = async (questionId, userId, answerText, req, next) => {
  const question = await qandaRepository.findQuestionById(questionId);
  if (!question) {
    return httpError(next, new Error('Question not found'), req, 404);
  }

  // In a real system, you might check if the user is the business owner to set isOfficialAnswer
  const answerData = {
    text: answerText,
    answeredBy: userId || '687926380911cf24d2eedf07'
  };

  return qandaRepository.addAnswerToQuestion(questionId, answerData);
};

export const getQandasForLocation = async (locationPostId) => {
  const qandas = await qandaRepository.findQuestionsByLocation(locationPostId);
  return qandas;
};
