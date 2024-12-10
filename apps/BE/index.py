from pymongo import MongoClient
from BE.controllers.productsController import productControllers

def connect_to_mongodb(uri="mongodb://localhost:27017/", db_name="test"):
    client = MongoClient(uri)
    db = client[db_name]
    print(f"Connected to database: {db_name}")
    return db

def main():
    db = connect_to_mongodb()
    collection = db["products"]
    
    collection.insert_one({"name": "Alice", "age": 25})
    print("Document inserted.")
    
    print("Documents in the collection:")
    for doc in collection.find():
        print(doc)
    
    print("Closing connection...")
    db.client.close()

if __name__ == "__main__":
    main()
