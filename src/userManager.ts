// src/userManager.ts

import { UserManager } from "oidc-client-ts";
import {oidcConfig } from "./oidcConfig";

const userManager = new UserManager(oidcConfig);

export default userManager;
