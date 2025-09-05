import { Qanda } from './qandaModel.js';

export const createQuestion = async (data) => Qanda.create(data);

export const findQuestionsByLocation = async (locationPostId) =>
  Qanda.find({ locationPost: locationPostId });

export const findQuestionById = async (id) => Qanda.findById(id);

export const addAnswerToQuestion = async (questionId, answerData) => {
  const updatedQA = await Qanda.findByIdAndUpdate(
    questionId,
    { $push: { answers: answerData } },
    { new: true }
  );
  return updatedQA;
};
