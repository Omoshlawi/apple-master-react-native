import { create } from 'apisauce'

// http://192.168.100.5:8000/properties/
const apiClient = create({ baseURL: "http://192.168.100.5:8000/" });

export default apiClient;
