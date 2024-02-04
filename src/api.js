import axios from 'axios';
import { FETCH_BY_DATE } from './constants/Endpoints';

export const fetchByDate = async(startDate, endDate)=>{
    try {
        const url = `${FETCH_BY_DATE}`;
        const response = await axios.post(
          url,
          {
            startDate: startDate,
            endDate: endDate
          }
        );
        return response;
      } catch (error) {
        console.error(error);
        throw error;
      }
}