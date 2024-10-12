import pkg from 'mongodb';
const { MongoClient, ServerApiVersion } = pkg;

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || "files_manager";

class DBclient {
	constructor() {
                const host = process.env.DB_HOST || 'localhost';
                const port = process.env.DB_PORT || 27017;
                const database = process.env.DB_DATABASE || 'files_manager';
            
                const url = `mongodb://${host}:${port}`;
            
                this.client = new MongoClient(url, { useUnifiedTopology: true });
            
                this.connecting = this.client.connect().then(() => {
                  console.log(`Connected to MongoDB on database: ${database}`);
                  this.db = this.client.db(database);
                }).catch((err) => {
                  console.error('Failed to connect to MongoDB:', err);
                });
        }


	async createConnection() {
		this.client = new MongoClient(this.URI, {
			useUnifiedTopology: true
		});

		try {
			await this.client.connect();
			this.db = this.client.db(DB_DATABASE);
			console.log("MongoDB connected successfully");
		} catch (error) {
			console.error("Error connecting to MongoDB:", error);
			throw error; // Propagate error for handling elsewhere
		}
	}

	isAlive() {
		try {
			this.client.db().command({ ping: 1 });
			return true;
		} catch (error) {
			return false;
		}
	}

	async nbUsers() {
		try {
			const usersCollection = this.db.collection("users");
			return await usersCollection.countDocuments();
		} catch (error) {
			console.error("Error counting users:", error);
			throw error; // Propagate error for handling elsewhere
		}
	}

	async nbFiles() {
		try {
			const filesCollection = this.db.collection("files");
			return await filesCollection.countDocuments();
		} catch (error) {
			console.error("Error counting files:", error);
			throw error; // Propagate error for handling elsewhere
		}
	}


	async closeConnection() {
		try {
			await this.client.close();
			console.log("MongoDB connection closed");
		} catch (error) {
			console.error("Error closing MongoDB connection:", error);
			throw error; // Propagate error for handling elsewhere
		}
	}
}

const dbClient = new DBclient();
export default dbClient;