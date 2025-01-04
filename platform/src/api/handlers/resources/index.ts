import { Request, Response } from "express"
import { ResourcePersistence } from "../../../persistence/resources"

const { getResource } = new ResourcePersistence()
