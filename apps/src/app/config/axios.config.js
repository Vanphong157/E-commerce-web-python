import axios from 'axios';

// Cấu hình mặc định cho axios
axios.defaults.baseURL = 'http://127.0.0.1:8000';
axios.defaults.withCredentials = true;  // Quan trọng: cho phép gửi/nhận cookies
axios.defaults.headers.common['Content-Type'] = 'application/json';

export default axios; 