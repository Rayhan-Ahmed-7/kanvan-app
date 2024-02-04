import { Theme } from "@mui/material";
import InputLabel from "./InputLabel";
import OutlinedInput from "./OutlinedInput";
import { merge } from "lodash";

export default function ComponentsOverride(theme: Theme) {
    return merge(
        InputLabel(theme),
        OutlinedInput(theme)
    )
}