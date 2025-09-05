import * as qandaRepository from './qandaRepository.js';
import * as locationPostRepository from '../locationPost/locationPostRepository.js';
import { httpError } from '../../utils/httpError.js';

export const askQuestion = async (locationPostId, userId, questionText) => {
  const locationPost = await locationPostRepository.findLocationPostById(locationPostId);
  if (!locationPost) {
    throw new httpError(404, 'Location post not found');
  }

  const questionData = {
    locationPost: locationPostId,
    question: {
      text: questionText,
      askedBy: userId
    },
    answers: []
  };

  return qandaRepository.createQuestion(questionData);
};

export const answerQuestion = async (questionId, userId, answerText) => {
  const question = await qandaRepository.findQuestionById(questionId);
  if (!question) {
    throw new httpError(404, 'Question not found');
  }

  // In a real system, you might check if the user is the business owner to set isOfficialAnswer
  const answerData = {
    text: answerText,
    answeredBy: userId
  };

  return qandaRepository.addAnswerToQuestion(questionId, answerData);
};

export const getQandasForLocation = async (locationPostId) => {
  const qandas = await qandaRepository.findQuestionsByLocation(locationPostId);
  return qandas;
};
