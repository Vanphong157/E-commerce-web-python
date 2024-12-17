import os
from dotenv import load_dotenv

load_dotenv()

# Sử dụng biến môi trường hoặc giá trị mặc định
SECRET_KEY = os.getenv('SECRET_KEY', 'e0c83453f11624f5fc9f3f2c187c86671f3d02d6e8ee6d1a9b89c3f4d8e5a6b7') 