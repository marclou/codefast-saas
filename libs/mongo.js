import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.MONGO_URI) {
	throw new Error('Invalid/Missing environment variable: "MONGO_URI"');
}

const uri = process.env.MONGO_URI;
const options = {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
};

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
	let globalWithMongo = global;
	globalWithMongo._mongoClientPromise = undefined;

	if (!globalWithMongo._mongoClientPromise) {
		client = new MongoClient(uri, options);
		globalWithMongo._mongoClientPromise = client.connect();
	}
	clientPromise = globalWithMongo._mongoClientPromise;
} else {
	client = new MongoClient(uri, options);
	clientPromise = client.connect();
}

export default clientPromise;
