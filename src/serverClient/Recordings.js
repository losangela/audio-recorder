import serverClient from './ServerClient';
import { handleResponse, handleError } from './Response';

export const getRecordings = async (input) => {
  try {
    const response = await serverClient.get('/recordings', input);

    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const uploadRecording = async (input) => {
  try {
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    const { fileName, recordingBlob } = input;

    const form = new FormData();
    form.append('wav', recordingBlob, fileName);

    const response = await serverClient.post('/recording', form, headers);

    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

