import "express-async-errors";
import expressLoaders from "./loaders/express";
import express from "express";

export default expressLoaders(express());
