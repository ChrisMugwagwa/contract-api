import express from "express";
import { callAddPlayer, callGetPlayers } from "./leaderboardService";
import { ValidationError, Validator } from "jsonschema";
const v = new Validator();

const server = express();
server.use(express.json());

const addPlayerSchema = {
  id: "addPlayer",
  type: "object",
  properties: {
    address: { type: "string" },
    score: { type: "integer" },
  },
  required: ["address", "score"],
  additionalProperties: false,
};

server.get("/players", async (req, res) => {
  try {
    res.status(200).send(await callGetPlayers());
  } catch (error: any) {
    if (error.reason === "invalid address") {
      res.status(400).send({error: "Invalid contract address"});
    } else {
      res.status(500).send({error: error.message});
    }
  }
});

server.post("/players", async (req, res) => {
  try {
    const {
      instance: { address, score },
      valid,
      errors,
    } = v.validate(req.body, addPlayerSchema);
    if (valid) {
      await res.send(await callAddPlayer(address, score));
    } else {
      throw new ValidationError((errors.map((error) => error.stack)).toString()); //the validator errors found in the request body
    }
  } catch (error: any) {
    if (error instanceof ValidationError) {
      res.status(400).send(error);
    } else {
      console.log(error)
    res.status(500).send({error: error.message});
    }
  }
});

export default server;
