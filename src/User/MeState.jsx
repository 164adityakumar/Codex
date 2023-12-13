import axios from "axios";
import { useEffect } from "react";
import { atom } from "recoil";

export const UserState = atom({
    key: "UserState",
    default: [],
});